'''
Business: API для управления объявлениями о поиске тиммейтов с модерацией
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name
Returns: HTTP response dict со списком объявлений или результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            status = params.get('status', 'approved')
            
            cur.execute(
                "SELECT id, title, description, game_mode, player_count, discord_tag, image_url, status, created_at FROM listings WHERE status = %s ORDER BY created_at DESC",
                (status,)
            )
            
            rows = cur.fetchall()
            listings = []
            for row in rows:
                listings.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'game_mode': row[3],
                    'player_count': row[4],
                    'discord_tag': row[5],
                    'image_url': row[6],
                    'status': row[7],
                    'created_at': row[8].isoformat() if row[8] else None
                })
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'listings': listings})
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute(
                "INSERT INTO listings (title, description, game_mode, player_count, discord_tag, image_url, status) VALUES (%s, %s, %s, %s, %s, %s, 'pending') RETURNING id",
                (
                    body.get('title'),
                    body.get('description'),
                    body.get('game_mode'),
                    body.get('player_count'),
                    body.get('discord_tag'),
                    body.get('image_url')
                )
            )
            
            listing_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps({'id': listing_id, 'message': 'Объявление отправлено на модерацию'})
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            listing_id = body.get('id')
            new_status = body.get('status')
            
            cur.execute(
                "UPDATE listings SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
                (new_status, listing_id)
            )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Статус обновлен'})
            }
        
        elif method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            listing_id = body.get('id')
            
            cur.execute("DELETE FROM listings WHERE id = %s", (listing_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Объявление удалено'})
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
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    }
