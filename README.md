# Device Validation Mock API

A lightweight REST mock API that validates devices by IMEI number. Built with Node.js + Express.

---

## Endpoints

### POST `/api/v1/device/validate`
Validates a device using its IMEI number.

**Request**
```json
{
  "imei": "994505989132903"
}
```

**Success Response — 200 OK**
```json
{
  "productId": "100112341",
  "serials": [
    { "id": "994505989132903", "idType": "IMEI",  "isPrimary": true  },
    { "id": "994505989136981", "idType": "IMEI2", "isPrimary": false },
    { "id": "99450598913290994505989132903", "idType": "EID", "isPrimary": false }
  ],
  "events": [
    { "type": "SALE",     "dateTime": "2026-04-03T14:00:00Z", "productId": "100112341", "location": { "id": "1234", "premiseCode": "ABCD" } },
    { "type": "RECEIPT",  "dateTime": "2026-02-26T15:54:15Z", "productId": "100112341", "location": { "id": "1234", "premiseCode": "ABCD" } },
    { "type": "DISPATCH", "dateTime": "2026-02-26T15:54:15Z", "productId": "100112341", "fromLocation": { "id": "54000" }, "toLocation": { "id": "12981", "premiseCode": "ABCD" } }
  ]
}
```

**Error Responses**

| Status | Error Code            | Reason                          |
|--------|-----------------------|---------------------------------|
| 400    | `BAD_REQUEST`         | `imei` field missing from body  |
| 400    | `INVALID_IMEI_FORMAT` | IMEI is not exactly 15 digits   |
| 404    | `DEVICE_NOT_FOUND`    | No device registered for IMEI   |

---

### GET `/api/v1/devices`
Lists all registered IMEI numbers (for testing purposes).

### GET `/health`
Returns service health status.

---

## Test IMEIs

| IMEI              | Product ID  |
|-------------------|-------------|
| `994505989132903` | 100112341   |
| `352099001761481` | 100298765   |
| `490154203237518` | 100334421   |
| `012345678901230` | 100009876   |

---

## Run Locally

```bash
npm install
npm start
# API available at http://localhost:3000
```

Test with curl:
```bash
curl -X POST http://localhost:3000/api/v1/device/validate \
  -H "Content-Type: application/json" \
  -d '{"imei": "994505989132903"}'
```

---

## Deploy to Render (Free Public URL)

1. Push this folder to a GitHub repository
2. Go to [https://render.com](https://render.com) and sign in
3. Click **New → Web Service** → connect your repo
4. Render auto-detects `render.yaml` — click **Deploy**
5. Your public URL will be: `https://device-validation-mock-api.onrender.com`

```bash
# Once deployed, call it like:
curl -X POST https://<your-render-url>/api/v1/device/validate \
  -H "Content-Type: application/json" \
  -d '{"imei": "994505989132903"}'
```

## Deploy to Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Deploy with Docker

```bash
docker build -t device-validation-api .
docker run -p 3000:3000 device-validation-api
```

---

## Add More Devices

Edit `data/devices.js` and add a new entry keyed by the IMEI:

```js
"123456789012345": {
  productId: "100XXXXXX",
  serials: [
    { id: "123456789012345", idType: "IMEI", isPrimary: true }
  ],
  events: [
    { type: "SALE", dateTime: "2026-01-01T00:00:00Z", productId: "100XXXXXX", location: { id: "0001", premiseCode: "TEST" } }
  ]
}
```
