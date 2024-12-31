from flask import Flask, jsonify, render_template, request
from computations.validations import validate_figure

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/validate', methods=['POST'])
def validate():
    """
    Endpoint para validar una figura completa al hacer clic en "Finish Figure".
    """
    try:
        data = request.json
        coords = data.get('coords')

        if not coords:
            return jsonify({"error": "No coordinates were fetched."}), 400

        validate_figure(coords)
        return jsonify({"status": "The figure is valid."}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Unexpected error: " + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
