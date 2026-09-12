import { NextResponse } from "next/server";
import { sheets, spreadsheetId } from "@/lib/googleSheets";

function formatDate(date) {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

function parseDate(date) {
  if (!date) return 0;

  const [day, month, year] = date.split("/");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).getTime();
}

export async function GET() {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Expenses!A:G",
    });

    const rows = result.data.values || [];

    const expenses = rows.slice(1).map((row) => ({
      date: row[0] || "",
      id: row[1] || "",
      description: row[2] || "",
      category: row[3] || "",
      amount: Number(row[4]) || 0,
      paymentMethod: row[5] || "",
      notes: row[6] || "",
    }));

    expenses.sort(
      (a, b) => parseDate(b.date) - parseDate(a.date)
    );

    return NextResponse.json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("GOOGLE SHEETS EXPENSES GET ERROR:", error);

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
    const expense = await request.json();

    const row = [
      formatDate(expense.date),
      expense.expenseId || "",
      expense.description || "",
      expense.category || "",
      expense.amount || 0,
      expense.paymentMethod || "",
      expense.notes || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Expenses!A:G",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    console.error("GOOGLE SHEETS EXPENSES POST ERROR:", error);

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
    const expense = await request.json();

    if (!expense.expenseId) {
      return NextResponse.json(
        {
          success: false,
          error: "Expense ID is required",
        },
        { status: 400 }
      );
    }

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Expenses!A:G",
    });

    const rows = result.data.values || [];

    const rowIndex = rows.findIndex(
      (row, index) =>
        index > 0 &&
        String(row[1]).replace("#EXP", "") ===
          String(expense.expenseId).replace("#EXP", "")
    );

    if (rowIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Expense not found",
        },
        { status: 404 }
      );
    }

    const sheetRow = rowIndex + 1;

    const updatedRow = [
      formatDate(expense.date),
      expense.expenseId || "",
      expense.description || "",
      expense.category || "",
      expense.amount || 0,
      expense.paymentMethod || "",
      expense.notes || "",
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Expenses!A${sheetRow}:G${sheetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRow],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error("GOOGLE SHEETS EXPENSES PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}