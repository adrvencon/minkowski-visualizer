import numpy as np

def minkowski_sum(figure1, figure2):
    result = []

    # Suma cada punto de una figura con otra.
    for point1 in figure1:
        for point2 in figure2:
            result.append({'x': point1['x'] + point2['x'], 'y': point1['y'] + point2['y']})
    
    # Calcula la envolvente convexa de los puntos resultantes.
    return convex_hull(result)

def convex_hull(points):
    points = sorted(points, key=lambda p: (p['x'], p['y']))

    def cross(o, a, b):
        return (a['x'] - o['x']) * (b['y'] - o['y']) - (a['y'] - o['y']) * (b['x'] - o['x'])

    # Construir la envolvente convexa.
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    # Eliminar el último punto de cada mitad porque se repite.
    lower.pop()
    upper.pop()

    return lower + upper