import re

def validate_polygon_coordinates(coords):
    if not re.match(r'^(-?\d+(\.\d+)?,-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?,-?\d+(\.\d+)?\s*)*)$', coords):
        raise ValueError("Invalid input. The format should be 'x,y x,y x,y ...'.")
    return coords

def validate_circle_or_ellipse(centerX, centerY, radiusX, radiusY):
    try:
        centerX = float(centerX)
        centerY = float(centerY)
        radiusX = float(radiusX)
        radiusY = float(radiusY)
    except ValueError:
        raise ValueError("All fields must be valid numbers.")
    if radiusX <= 0 or radiusY <= 0:
        raise ValueError("Radius values must be positive.")
    return centerX, centerY, radiusX, radiusY

def validate_curve_data(functionString, rangeStart, rangeEnd, stepSize):
    if not re.match(r'^[0-9a-zA-Z\+\-\*\/\.\^()]*$', functionString):
        raise ValueError("Invalid function. Only numbers, letters, operators, and parentheses are allowed.")

    if stepSize <= 0:
        raise ValueError("Step size cannot be zero or lower.")

    return functionString, rangeStart, rangeEnd, stepSize