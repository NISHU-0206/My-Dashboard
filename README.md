# 📊 Full Stack D3.js Dashboard

An interactive, responsive, and fully visual **data analytics dashboard** inspired by professional health analytics dashboards like H-care.

Built with:
- **React + D3.js + Vite + CSS** (Frontend)
- **Python Flask + Pandas** (Backend)

Provides dynamic filtering, vibrant visualizations, and modern KPI cards with D3.js-driven charts.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React** (with Vite for fast development)
- **Axios** (for API calls)
- **D3.js** (for bar, pie, and line charts)
- **CSS** (custom responsive layout inspired by dashboards)

### 🔙 Backend
- **Python Flask** (REST API)
- **Flask-CORS** (for CORS handling)
- **Pandas** (for data preprocessing)
- **JSON** (data source)

---

## 📁 Project Structure

```
/my-dashboard/
├── client/              # Frontend (React + D3.js)
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env             # API base URL config
│   └── index.html
├── server/              # Backend (Flask)
│   ├── app.py
│   ├── data.json        # Data source
│   └── requirements.txt
├── .gitignore
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NISHU-0206/My-Dashboard.git
cd My-Dashboard
```

### 2. Start the Backend (Flask)
```bash
cd server
pip install -r requirements.txt
python app.py
```
➡️ Server will run at: `http://localhost:5000/`

### 3. Start the Frontend (React + Vite)
```bash
cd ../client
npm install
npm run dev
```
➡️ Frontend runs at: `http://localhost:5173/`

Ensure `.env` file contains:
```
VITE_API_URL=http://localhost:5000
```

---

## 📌 Features

- 🎯 Filter by Topic, Sector, Country, and Year
- 📊 Beautiful and interactive **Bar**, **Pie**, and **Line** charts with D3.js
- 🧾 KPI Cards: Total Records, Avg Intensity, Country Count, Latest Year
- 📱 Fully Responsive (Mobile/Desktop)
- 🌈 Modern layout with sidebar, card styling, and dashboard-like grid
- 🔁 Real-time updates based on filter inputs
- ✨ Easy to extend with new charts or datasets

