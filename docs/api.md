# API Documentation

## Base URL

```text
http://localhost:3000
```

---

# Health Check

## GET /api/health

Backend server'ın çalışıp çalışmadığını kontrol eder.

### Request

```bash
curl http://localhost:3000/api/health
```

### Success Response

```json
{
  "status": "ok",
  "service": "Smart Appliance Connection & Health Monitor Backend"
}
```

---

# Appliances

## Validation Rules

Appliance API sadece belirli `status` ve `health` değerlerini kabul eder.

### Valid status values

```text
online
offline
```

### Valid health values

```text
good
warning
critical
unknown
```

Geçersiz değer gönderilirse API `400 Bad Request` cevabı döndürür.

---

## Appliance Object Structure

Bir appliance nesnesi şu alanlardan oluşur:

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| id | number | Cihazın benzersiz ID değeri |
| name | string | Cihaz adı |
| type | string | Cihaz tipi |
| status | string | Cihazın bağlantı durumu |
| health | string | Cihazın sağlık durumu |

---

# Endpoint List

```text
GET     /api/health
GET     /api/appliances
GET     /api/appliances/:id
POST    /api/appliances
PATCH   /api/appliances/:id/status
PATCH   /api/appliances/:id/health
DELETE  /api/appliances/:id
```

---

# GET /api/appliances

Tüm cihazları listeler.

## Request

```bash
curl http://localhost:3000/api/appliances
```

## Success Response

```json
[
  {
    "id": 1,
    "name": "Washing Machine",
    "type": "washer",
    "status": "online",
    "health": "good"
  },
  {
    "id": 2,
    "name": "Refrigerator",
    "type": "fridge",
    "status": "online",
    "health": "warning"
  },
  {
    "id": 3,
    "name": "Dishwasher",
    "type": "dishwasher",
    "status": "offline",
    "health": "unknown"
  }
]
```

---

# GET /api/appliances/:id

ID değerine göre tek cihaz getirir.

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | number | yes | Cihaz ID değeri |

## Request

```bash
curl http://localhost:3000/api/appliances/1
```

## Success Response

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
```

## Error Response

### 404 Not Found

```json
{
  "message": "Appliance not found"
}
```

---

# POST /api/appliances

Yeni cihaz ekler.

## Request Headers

```text
Content-Type: application/json
```

## Request Body

```json
{
  "name": "Smart Oven",
  "type": "oven",
  "status": "online",
  "health": "good"
}
```

## Request

```bash
curl -X POST http://localhost:3000/api/appliances \
-H "Content-Type: application/json" \
-d '{"name":"Smart Oven","type":"oven","status":"online","health":"good"}'
```

## Success Response

### 201 Created

```json
{
  "id": 4,
  "name": "Smart Oven",
  "type": "oven",
  "status": "online",
  "health": "good"
}
```

## Error Responses

### 400 Bad Request

Eksik alan gönderilirse:

```json
{
  "message": "name, type, status and health are required"
}
```

Geçersiz `status` gönderilirse:

```json
{
  "message": "status must be online or offline"
}
```

Geçersiz `health` gönderilirse:

```json
{
  "message": "health must be good, warning, critical or unknown"
}
```

---

# PATCH /api/appliances/:id/status

Cihazın bağlantı durumunu günceller.

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | number | yes | Cihaz ID değeri |

## Request Headers

```text
Content-Type: application/json
```

## Request Body

```json
{
  "status": "offline"
}
```

## Request

```bash
curl -X PATCH http://localhost:3000/api/appliances/1/status \
-H "Content-Type: application/json" \
-d '{"status":"offline"}'
```

## Success Response

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "offline",
  "health": "good"
}
```

## Error Responses

### 404 Not Found

Cihaz bulunamazsa:

```json
{
  "message": "Appliance not found"
}
```

### 400 Bad Request

`status` gönderilmezse:

```json
{
  "message": "status is required"
}
```

Geçersiz `status` gönderilirse:

```json
{
  "message": "status must be online or offline"
}
```

---

# PATCH /api/appliances/:id/health

Cihazın sağlık durumunu günceller.

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | number | yes | Cihaz ID değeri |

## Request Headers

```text
Content-Type: application/json
```

## Request Body

```json
{
  "health": "critical"
}
```

## Request

```bash
curl -X PATCH http://localhost:3000/api/appliances/2/health \
-H "Content-Type: application/json" \
-d '{"health":"critical"}'
```

## Success Response

```json
{
  "id": 2,
  "name": "Refrigerator",
  "type": "fridge",
  "status": "online",
  "health": "critical"
}
```

## Error Responses

### 404 Not Found

Cihaz bulunamazsa:

```json
{
  "message": "Appliance not found"
}
```

### 400 Bad Request

`health` gönderilmezse:

```json
{
  "message": "health is required"
}
```

Geçersiz `health` gönderilirse:

```json
{
  "message": "health must be good, warning, critical or unknown"
}
```

---

# DELETE /api/appliances/:id

ID değerine göre cihaz siler.

## Path Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | number | yes | Cihaz ID değeri |

## Request

```bash
curl -X DELETE http://localhost:3000/api/appliances/3
```

## Success Response

```json
{
  "message": "Appliance deleted successfully",
  "appliance": {
    "id": 3,
    "name": "Dishwasher",
    "type": "dishwasher",
    "status": "offline",
    "health": "unknown"
  }
}
```

## Error Response

### 404 Not Found

```json
{
  "message": "Appliance not found"
}
```

---

# Notes

Şu an backend tarafında veriler mock data olarak tutulur.

Mock data şu dosyadadır:

```text
backend/src/data/appliances.js
```

Eklenen, güncellenen veya silinen cihazlar sadece server çalıştığı sürece bellekte kalır.

Server yeniden başlatıldığında cihaz listesi tekrar varsayılan mock data haline döner.

İlerleyen aşamalarda bu yapı database ile değiştirilecektir.
