<p align="center">
  <img src="app/static/images/logo.png" alt="Project Logo" width="220" />
</p>

<h1 align="center">Minkowski Sum Visualizer</h1>

<h4 align="center">
  <em>Bachelor's Thesis in Software Engineering</em>
</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12.6-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
  
</p>
<p align="center">
  <strong>University of Seville</strong><br/>
  <strong>Author:</strong> Adriana Vento Conesa<br/>
  <strong>Supervisor:</strong> Antonio Jesús Cañete Martín
</p>

<h1></h1>

This project was developed as part of a **Bachelor's Thesis in Software Engineering** at the University of Seville. Its primary goal is to provide an interactive web-based tool for visualizing and exploring the **Minkowski sum** of planar geometric figures.

TThe application allows users to define two **closed, convex** planar geometric shapes and visualize both their configuration and the resulting Minkowski sum. It provides insight into the properties of the generated sum, and offers the option to export the result. This tool is intended for educational use and applications in computational geometry, robotics, and related fields.

## Live Deployment

The application is deployed and publicly accessible at: [https://adrvencon-tfg.onrender.com/](https://adrvencon-tfg.onrender.com/)

## Technologies Used

- **Backend:** Python 3.12.6 with Flask 3.0.3
- **Frontend:** HTML5, CSS3, JavaScript, Chart.js
- **Documentation:** Final report authored in LaTeX. Please contact the author if you are interested in accessing the document.

## Local Deployment

#### 1. **Clone the repository**:

```bash
git clone https://github.com/adrvencon/tfg.git
cd tfg
```

#### 2. **Create a virtual environment**:

```bash
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
```

#### 3. **Install dependencies**:

```bash
pip install -r requirements.txt
```

#### 4. **Run the application**:

```bash
python run.py
```

By default, the application will be available at: `http://127.0.0.1:5000`

## Contributions

This project was developed as part of an academic project and is not currently open to external contributions. Please feel free to fork the project or open an issue for feedback.

## License

This project is licensed under the terms of the MIT License.  
See the [LICENSE](LICENSE) file for details.

