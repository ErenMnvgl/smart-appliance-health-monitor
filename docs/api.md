
# API Documentation

Base URL:

```text
http://localhost:3000
```

## Health Check

### GET /api/health

Backend server'ın çalışıp çalışmadığını kontrol eder.

#### Response

```json
{
  "status": "ok",
  "service": "Smart Appliance Connection & Health Monitor Backend"
}
```

---

## Appliances

### GET /api/appliances

Tüm cihazları listeler.

#### Response

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

### GET /api/appliances/:id

ID değerine göre tek cihaz getirir.

#### Path Parameters

| Name | Type | Description |
|---|---|---|
| id | number | Cihaz ID değeri |

#### Success Response

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "online",
  "health": "good"
}
```

#### Error Response

```json
{
  "message": "Appliance not found"
}
```

---

### POST /api/appliances

Yeni cihaz ekler.

#### Request Body

```json
{
  "name": "Smart Oven",
  "type": "oven",
  "status": "online",
  "health": "good"
}
```

#### Success Response

```json
{
  "id": 4,
  "name": "Smart Oven",
  "type": "oven",
  "status": "online",
  "health": "good"
}
```

#### Error Response

```json
{
  "message": "name, type, status and health are required"
}
```

---

### PATCH /api/appliances/:id/status

Cihazın bağlantı durumunu günceller.

#### Path Parameters

| Name | Type | Description |
|---|---|---|
| id | number | Cihaz ID değeri |

#### Request Body

```json
{
  "status": "offline"
}
```

#### Success Response

```json
{
  "id": 1,
  "name": "Washing Machine",
  "type": "washer",
  "status": "offline",
  "health": "good"
}
```

#### Error Responses

```json
{
  "message": "Appliance not found"
}
```

```json
{
  "message": "status is required"
}
```

---

### PATCH /api/appliances/:id/health

Cihazın sağlık durumunu günceller.

#### Path Parameters

| Name | Type | Description |
|---|---|---|
| id | number | Cihaz ID değeri |

#### Request Body

```json
{
  "health": "critical"
}
```

#### Success Response

```json
{
  "id": 2,
  "name": "Refrigerator",
  "type": "fridge",
  "status": "online",
  "health": "critical"
}
```

#### Error Responses

```json
{
  "message": "Appliance not found"
}
```

```json
{
  "message": "health is required"
}
```

---

### DELETE /api/appliances/:id

ID değerine göre cihaz siler.

#### Path Parameters

| Name | Type | Description |
|---|---|---|
| id | number | Cihaz ID değeri |

#### Success Response

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

#### Error Response

```json
{
  "message": "Appliance not found"
}
```

---

## Current Endpoint List

```text
GET     /api/health
GET     /api/appliances
GET     /api/appliances/:id
POST    /api/appliances
PATCH   /api/appliances/:id/status
PATCH   /api/appliances/:id/health
DELETE  /api/appliances/:id
```
