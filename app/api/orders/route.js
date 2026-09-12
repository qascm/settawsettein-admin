import { NextResponse } from "next/server";
import { sheets, spreadsheetId } from "@/lib/googleSheets";

export async function GET() {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Orders!A:J",
    });

    const rows = result.data.values || [];

    const orders = rows.slice(1).map((row) => ({
      date: row[0] || "",
      id: row[1] || "",
      customer: row[2] || "",
      phone: row[3] || "",
      address: row[4] || "",
      total: Number(row[5]) || 0,
      payment: row[6] || "",
      status: row[7] || "Pending",
      products: row[8] || "",
      noItems: Number(row[9]) || 0,
    }));

    orders.sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GOOGLE SHEETS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const order = await request.json();

    const row = [
      order.date || "",
      order.orderId || "",
      order.customerName || "",
      order.phone || "",
      order.address || "",
      order.totalAmount || 0,
      order.paymentMethod || "",
      order.status || "Pending",
      order.products || "",
      Number(order.noItems) || 0,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Orders!A:J",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order added successfully",
    });
  } catch (error) {
    console.error("GOOGLE SHEETS POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const order = await request.json();

    if (!order.orderId) {
      return NextResponse.json(
        {
          success: false,
          error: "Order ID is required",
        },
        { status: 400 }
      );
    }

    // Get all orders to find the matching row
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Orders!A:J",
    });

    const rows = result.data.values || [];

    // Find row by Order ID
    const rowIndex = rows.findIndex(
      (row, index) =>
        index > 0 &&
        String(row[1]).replace("#", "") ===
          String(order.orderId).replace("#", "")
    );

    if (rowIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // Google Sheets rows are 1-based
    const sheetRow = rowIndex + 1;

    const updatedRow = [
      order.date || "",
      order.orderId || "",
      order.customerName || "",
      order.phone || "",
      order.address || "",
      order.totalAmount || 0,
      order.paymentMethod || "",
      order.status || "Pending",
      order.products || "",
      Number(order.noItems) || 0,
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Orders!A${sheetRow}:J${sheetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRow],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("GOOGLE SHEETS PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}