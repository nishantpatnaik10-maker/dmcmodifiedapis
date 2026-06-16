/**
 * Mock device database keyed by IMEI number.
 * Each device contains serials, product info, and event history
 * matching the DeviceValidation API response schema.
 */
const devices = {
  "994505989132903": {
    productId: "100112341",
    serials: [
      { id: "994505989132903", idType: "IMEI",  isPrimary: true  },
      { id: "994505989136981", idType: "IMEI2", isPrimary: false },
      { id: "99450598913290994505989132903", idType: "EID", isPrimary: false }
    ],
    events: [
      {
        type: "SALE",
        dateTime: "2026-04-03T14:00:00Z",
        productId: "100112341",
        location: { id: "1234", premiseCode: "ABCD" }
      },
      {
        type: "RECEIPT",
        dateTime: "2026-02-26T15:54:15Z",
        productId: "100112341",
        location: { id: "1234", premiseCode: "ABCD" }
      },
      {
        type: "DISPATCH",
        dateTime: "2026-02-26T15:54:15Z",
        productId: "100112341",
        fromLocation: { id: "54000" },
        toLocation: { id: "12981", premiseCode: "ABCD" }
      }
    ]
  },

  "352099001761481": {
    productId: "100298765",
    serials: [
      { id: "352099001761481", idType: "IMEI",  isPrimary: true  },
      { id: "352099001761499", idType: "IMEI2", isPrimary: false },
      { id: "89014103211118510720", idType: "EID", isPrimary: false }
    ],
    events: [
      {
        type: "SALE",
        dateTime: "2026-03-15T09:30:00Z",
        productId: "100298765",
        location: { id: "5678", premiseCode: "WXYZ" }
      },
      {
        type: "RECEIPT",
        dateTime: "2026-01-10T11:00:00Z",
        productId: "100298765",
        location: { id: "5678", premiseCode: "WXYZ" }
      },
      {
        type: "DISPATCH",
        dateTime: "2026-01-10T11:00:00Z",
        productId: "100298765",
        fromLocation: { id: "60001" },
        toLocation: { id: "5678", premiseCode: "WXYZ" }
      }
    ]
  },

  "490154203237518": {
    productId: "100334421",
    serials: [
      { id: "490154203237518", idType: "IMEI",  isPrimary: true  },
      { id: "490154203237526", idType: "IMEI2", isPrimary: false },
      { id: "89049032000235071234", idType: "EID", isPrimary: false }
    ],
    events: [
      {
        type: "RECEIPT",
        dateTime: "2025-11-20T08:00:00Z",
        productId: "100334421",
        location: { id: "9999", premiseCode: "MNOP" }
      },
      {
        type: "DISPATCH",
        dateTime: "2025-11-20T08:00:00Z",
        productId: "100334421",
        fromLocation: { id: "70002" },
        toLocation: { id: "9999", premiseCode: "MNOP" }
      }
    ]
  },

  "012345678901230": {
    productId: "100009876",
    serials: [
      { id: "012345678901230", idType: "IMEI",  isPrimary: true  },
      { id: "012345678901248", idType: "IMEI2", isPrimary: false }
    ],
    events: [
      {
        type: "SALE",
        dateTime: "2026-05-01T16:45:00Z",
        productId: "100009876",
        location: { id: "1111", premiseCode: "QRST" }
      },
      {
        type: "RECEIPT",
        dateTime: "2026-04-05T10:20:00Z",
        productId: "100009876",
        location: { id: "1111", premiseCode: "QRST" }
      },
      {
        type: "DISPATCH",
        dateTime: "2026-04-05T10:20:00Z",
        productId: "100009876",
        fromLocation: { id: "80003" },
        toLocation: { id: "1111", premiseCode: "QRST" }
      }
    ]
  }
};

module.exports = devices;
