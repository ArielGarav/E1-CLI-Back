import inquirer from "inquirer";
import fs from "fs";

const promptQuestions = [
  {
    type: "input",
    name: "item",
    message: "Ingrese el nombre del artículo:",
  },
  {
    type: "number",
    name: "price",
    message: "Ingrese el precio del artículo:",
  },
];

async function main() {
  const expenses = [];

  // Leer el archivo JSON existente si existe
  let existingExpenses = [];
  if (fs.existsSync("expenses.json")) {
    const data = fs.readFileSync("expenses.json", "utf8");
    existingExpenses = JSON.parse(data);
  }

  // Agregar gastos existentes al array de gastos
  expenses.push(...existingExpenses);

  // Solicitar los nuevos gastos
  const answers = await inquirer.prompt(promptQuestions);
  const { item, price } = answers;
  expenses.push({ item, price });

  // Guardar los gastos actualizados en el archivo JSON
  const data = JSON.stringify(expenses, null, 2);
  fs.writeFile("expenses.json", data, "utf8", (err) => {
    if (err) {
      console.log("Error al guardar los gastos:", err);
    } else {
      console.log("Los gastos se han guardado correctamente en expenses.json.");
    }
  });
}

main();
