from flask import Flask, render_template, request, jsonify, Blueprint
from .validations.figure_validations import validate_figure
from .validations.input_validations import validate_circle_or_ellipse, validate_curve_data, validate_polygon_coordinates
from .computations.minkowski import minkowski_sum

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/validate', methods=['POST'])
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
    
@bp.route('/minkowski-sum', methods=['POST'])
def calculate_minkowski_sum():
    try:
        data = request.get_json()
        figure1 = data['figure1']
        figure2 = data['figure2']
        
        result = minkowski_sum(figure1, figure2)
        return jsonify({'sum': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/validate-polygon', methods=['POST'])
def validate_polygon():
    data = request.json
    coords = data.get('coords')
    
    if not coords:
        return jsonify({"error": "No coordinates provided."}), 400

    try:
        validate_polygon_coordinates(coords)
        return jsonify({"status": "Polygon coordinates are valid."}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/validate-circle-ellipse', methods=['POST'])
def validate_circle_or_ellipse_route():
    data = request.json
    centerX = data.get('centerX')
    centerY = data.get('centerY')
    radiusX = data.get('radiusX')
    radiusY = data.get('radiusY')

    if None in [centerX, centerY, radiusX, radiusY]:
        return jsonify({"error": "All fields must be provided."}), 400

    try:
        validate_circle_or_ellipse(centerX, centerY, radiusX, radiusY)
        return jsonify({"status": "Circle/Ellipse is valid."}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/validate-curve', methods=['POST'])
def validate_curve():
    data = request.json
    functionString = data.get('functionString')
    rangeStart = data.get('rangeStart')
    rangeEnd = data.get('rangeEnd')
    stepSize = data.get('stepSize')

    if None in [functionString, rangeStart, rangeEnd, stepSize]:
        return jsonify({"error": "All fields must be provided."}), 400

    try:
        functionString, rangeStart, rangeEnd, stepSize = validate_curve_data(functionString, rangeStart, rangeEnd, stepSize)
        return jsonify({"status": "Curve data is valid."}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400