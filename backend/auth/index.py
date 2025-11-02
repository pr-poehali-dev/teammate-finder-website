'''
Business: Простая авторизация администратора для доступа к админ-панели
Args: event - dict с httpMethod, body
      context - object с request_id, function_name
Returns: HTTP response dict с токеном авторизации или ошибкой
'''

import json
import os
import psycopg2
import hashlib
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, password_hash: str) -> bool:
    return hash_password(password) == password_hash

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        body = json.loads(event.get('body', '{}'))
        username = body.get('username')
        password = body.get('password')
        action = body.get('action', 'login')
        
        if action == 'register':
            password_hash = hash_password(password)
            cur.execute(
                "INSERT INTO admins (username, password_hash) VALUES (%s, %s) RETURNING id",
                (username, password_hash)
            )
            admin_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({
                    'message': 'Администратор создан',
                    'token': f'admin_{admin_id}_{username}'
                })
            }
        
        else:
            cur.execute(
                "SELECT id, username, password_hash FROM admins WHERE username = %s",
                (username,)
            )
            
            result = cur.fetchone()
            
            if result and verify_password(password, result[2]):
                admin_id, username_db = result[0], result[1]
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'message': 'Авторизация успешна',
                        'token': f'admin_{admin_id}_{username_db}'
                    })
                }
            else:
                return {
                    'statusCode': 401,
                    'headers': headers,
                    'body': json.dumps({'error': 'Неверный логин или пароль'})
                }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()