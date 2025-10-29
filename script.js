const foodList = document.getElementById('foodList');
const totals = document.getElementById('totals');
const foodModal = document.getElementById('foodModal');
const btnAdd = document.querySelector('.btn-add');
const btnReset = document.querySelector('.btn-reset');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const foodSelect = document.getElementById('foodSelect');
const foodQuantity = document.getElementById('foodQuantity');

// Food database
const foodDatabase = [
  {name: "Rice", unit: "g", calories: 130, protein: 2.7, carbs: 28, fats: 0.3, minerals: "Iron"},
  {name: "Banana", unit: "pcs", calories: 105, protein: 1.3, carbs: 27, fats: 0.3, minerals: "Potassium"},
  {name: "Egg", unit: "pcs", calories: 68, protein: 5.5, carbs: 0.6, fats: 4.8, minerals: "Calcium"},
  {name: "Oats", unit: "g", calories: 389, protein: 16.9, carbs: 66, fats: 6.9, minerals: "Iron"},
  {name: "Muesli", unit: "g", calories: 370, protein: 10, carbs: 65, fats: 7, minerals: "Magnesium"},
  {name: "Protein Powder", unit: "g", calories: 120, protein: 24, carbs: 3, fats: 1, minerals: "Calcium"},
  {name: "Sattu", unit: "g", calories: 340, protein: 22, carbs: 52, fats: 2, minerals: "Iron"},
  {name: "Milk (100ml)", unit: "ml", calories: 42, protein: 3.4, carbs: 5, fats: 1, minerals: "Calcium"},
  {name: "Potato", unit: "g", calories: 77, protein: 2, carbs: 17, fats: 0.1, minerals: "Potassium"}
];

let userFoods = [];

// Populate food select
function populateFoodSelect() {
  foodSelect.innerHTML = '';
  foodDatabase.forEach((food, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${food.name} (${food.unit})`;
    foodSelect.appendChild(option);
  });
}

// Render foods
function renderFoods() {
  foodList.innerHTML = '';
  let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;

  userFoods.forEach((food, index) => {
    const card = document.createElement('div');
    card.classList.add('food-card');

    const foodInfo = document.createElement('div');
    foodInfo.classList.add('food-info');

    const nameEl = document.createElement('div');
    nameEl.classList.add('food-name');
    nameEl.textContent = food.name;

    const nutritionEl = document.createElement('div');
    nutritionEl.classList.add('nutrition');
    nutritionEl.textContent = `Calories: ${food.calories * food.quantity} kcal | Protein: ${(food.protein * food.quantity).toFixed(1)}g | Carbs: ${(food.carbs * food.quantity).toFixed(1)}g | Fats: ${(food.fats * food.quantity).toFixed(1)}g | Minerals: ${food.minerals}`;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = '✖';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      userFoods.splice(index, 1);
      renderFoods();
    });

    foodInfo.appendChild(nameEl);
    foodInfo.appendChild(nutritionEl);

    card.appendChild(foodInfo);
    card.appendChild(removeBtn);
    foodList.appendChild(card);

    totalCalories += food.calories * food.quantity;
    totalProtein += food.protein * food.quantity;
    totalCarbs += food.carbs * food.quantity;
    totalFats += food.fats * food.quantity;
  });

  totals.textContent = `Total Calories: ${totalCalories.toFixed(1)} kcal | Protein: ${totalProtein.toFixed(1)}g | Carbs: ${totalCarbs.toFixed(1)}g | Fats: ${totalFats.toFixed(1)}g`;
}

// Open modal
btnAdd.addEventListener('click', () => {
  populateFoodSelect();
  foodQuantity.value = '';
  foodModal.style.display = 'flex';
});

// Cancel modal
cancelBtn.addEventListener('click', () => {
  foodModal.style.display = 'none';
});

// Save food
saveBtn.addEventListener('click', () => {
  const selectedIndex = parseInt(foodSelect.value);
  const quantity = parseFloat(foodQuantity.value);
  if (isNaN(quantity) || quantity <= 0) return alert("Enter a valid quantity!");
  const food = {...foodDatabase[selectedIndex], quantity};
  userFoods.push(food);
  renderFoods();
  foodModal.style.display = 'none';
});

// Reset all
btnReset.addEventListener('click', () => {
  userFoods = [];
  renderFoods();
});

// Close modal on outside click
window.addEventListener('click', e => {
  if (e.target === foodModal) foodModal.style.display = 'none';
});
