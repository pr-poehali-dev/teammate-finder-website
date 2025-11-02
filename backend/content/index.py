'''
Business: API для управления всем контентом сайта (новости, VIP тарифы, информация о клане)
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с request_id, function_name
Returns: HTTP response dict с данными или результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any, List
from datetime import datetime, date

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
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        params = event.get('queryStringParameters') or {}
        content_type = params.get('type', 'news')
        
        if method == 'GET':
            if content_type == 'news':
                cur.execute("""
                    SELECT id, title, date, category, content, image_url, is_important, created_at
                    FROM news 
                    ORDER BY date DESC, created_at DESC
                """)
                columns = ['id', 'title', 'date', 'category', 'content', 'image_url', 'is_important', 'created_at']
                news = []
                for row in cur.fetchall():
                    item = {}
                    for i in range(len(columns)):
                        value = row[i]
                        if isinstance(value, (datetime, date)):
                            item[columns[i]] = value.isoformat()
                        else:
                            item[columns[i]] = value
                    news.append(item)
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'news': news}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'vip':
                cur.execute("""
                    SELECT id, tier_id, name, price, duration, color, is_popular, features, sort_order
                    FROM vip_tiers 
                    ORDER BY sort_order
                """)
                columns = ['id', 'tier_id', 'name', 'price', 'duration', 'color', 'is_popular', 'features', 'sort_order']
                tiers = []
                for row in cur.fetchall():
                    tiers.append({columns[i]: row[i] for i in range(len(columns))})
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'vip_tiers': tiers}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'clan':
                cur.execute("""
                    SELECT id, section, title, content, items
                    FROM clan_info
                """)
                columns = ['id', 'section', 'title', 'content', 'items']
                clan_info = []
                for row in cur.fetchall():
                    clan_info.append({columns[i]: row[i] for i in range(len(columns))})
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'clan_info': clan_info}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if content_type == 'news':
                cur.execute("""
                    INSERT INTO news (title, date, category, content, image_url, is_important)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    body['title'],
                    body.get('date', datetime.now().date()),
                    body['category'],
                    body['content'],
                    body.get('image_url'),
                    body.get('is_important', False)
                ))
                news_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps({'id': news_id, 'message': 'Новость создана'}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'vip':
                cur.execute("""
                    INSERT INTO vip_tiers (tier_id, name, price, duration, color, is_popular, features, sort_order)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    body['tier_id'],
                    body['name'],
                    body['price'],
                    body['duration'],
                    body['color'],
                    body.get('is_popular', False),
                    body['features'],
                    body.get('sort_order', 0)
                ))
                tier_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps({'id': tier_id, 'message': 'VIP тариф создан'}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'clan':
                cur.execute("""
                    INSERT INTO clan_info (section, title, content, items)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id
                """, (
                    body['section'],
                    body['title'],
                    body['content'],
                    body['items']
                ))
                info_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': headers,
                    'body': json.dumps({'id': info_id, 'message': 'Информация о клане создана'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            item_id = body.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'ID обязателен'}),
                    'isBase64Encoded': False
                }
            
            if content_type == 'news':
                cur.execute("""
                    UPDATE news 
                    SET title = %s, date = %s, category = %s, content = %s, 
                        image_url = %s, is_important = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (
                    body['title'],
                    body['date'],
                    body['category'],
                    body['content'],
                    body.get('image_url'),
                    body.get('is_important', False),
                    item_id
                ))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Новость обновлена'}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'vip':
                cur.execute("""
                    UPDATE vip_tiers 
                    SET name = %s, price = %s, duration = %s, color = %s, 
                        is_popular = %s, features = %s, sort_order = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (
                    body['name'],
                    body['price'],
                    body['duration'],
                    body['color'],
                    body.get('is_popular', False),
                    body['features'],
                    body.get('sort_order', 0),
                    item_id
                ))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'VIP тариф обновлён'}),
                    'isBase64Encoded': False
                }
            
            elif content_type == 'clan':
                cur.execute("""
                    UPDATE clan_info 
                    SET title = %s, content = %s, items = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                """, (
                    body['title'],
                    body['content'],
                    body['items'],
                    item_id
                ))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Информация о клане обновлена'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            item_id = body.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'ID обязателен'}),
                    'isBase64Encoded': False
                }
            
            table_map = {
                'news': 'news',
                'vip': 'vip_tiers',
                'clan': 'clan_info'
            }
            
            table = table_map.get(content_type)
            if table:
                cur.execute(f"DELETE FROM {table} WHERE id = %s", (item_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'message': 'Элемент удалён'}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()