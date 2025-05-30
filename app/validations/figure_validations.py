import numpy as np
from scipy.spatial import ConvexHull

def is_closed(coords, epsilon=1e-3):
    if len(coords) < 3:
        return False

    first = coords[0]
    last = coords[-1]

    closes_loop = (
        abs(first['x'] - last['x']) < epsilon and abs(first['y'] - last['y']) < epsilon
    )

    if closes_loop:
        return True

    for i in range(len(coords) - 1):
        a, b = coords[i], coords[i + 1]
        if (
            (abs(a['x'] - first['x']) < epsilon and abs(a['y'] - first['y']) < epsilon and
             abs(b['x'] - last['x']) < epsilon and abs(b['y'] - last['y']) < epsilon)
            or
            (abs(b['x'] - first['x']) < epsilon and abs(b['y'] - first['y']) < epsilon and
             abs(a['x'] - last['x']) < epsilon and abs(a['y'] - last['y']) < epsilon)
        ):
            return True

    return False

def is_convex(coords, epsilon = 1e-3):
    print(coords)
    if len(coords) < 4:
        return True

    def cross_product(o, a, b):
        # (a - o) x (b - o)
        return (a['x'] - o['x']) * (b['y'] - o['y']) - (a['y'] - o['y']) * (b['x'] - o['x'])
    
    last_sign = 0

    for i in range(len(coords)):
        o = coords[i]
        a = coords[(i + 1) % len(coords)]
        b = coords[(i + 2) % len(coords)]
        cross = cross_product(o, a, b)

        # Ignorar los productos pequeños.
        if abs(cross) > epsilon:
            current_sign = 1 if cross > 0 else -1
            if last_sign == 0:
                last_sign = current_sign
            elif last_sign != current_sign:
                return False

    return True

def cross(o, a, b):
    """Producto cruzado de OA y OB (con origen en O)"""
    return (a['x'] - o['x']) * (b['y'] - o['y']) - (a['y'] - o['y']) * (b['x'] - o['x'])

def convex_hull(points):
    """Construye la envolvente convexa de un conjunto de puntos 2D."""
    # Elimina duplicados
    unique_points = list({(p['x'], p['y']) for p in points})
    points = [{'x': x, 'y': y} for x, y in sorted(unique_points)]

    if len(points) < 3:
        return points  # No se puede formar un polígono

    # Construye la parte inferior del casco
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # Construye la parte superior del casco
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    # Concatenamos partes (eliminando el último punto de cada parte porque se repite)
    return lower[:-1] + upper[:-1]

def is_convex_polygon(points):
    hull = convex_hull(points)
    return len(hull) == len(set((p['x'], p['y']) for p in points))

def validate_figure(coords):
    if not is_closed(coords):
        raise ValueError("The figure is not closed.")
    if not is_convex_polygon(coords):
        raise ValueError("The figure is not convex.")
