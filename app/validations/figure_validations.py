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

def cross(o, a, b):
    return (a['x'] - o['x']) * (b['y'] - o['y']) - (a['y'] - o['y']) * (b['x'] - o['x'])

def is_convex(points):
    n = len(points)
    if n < 3:
        return False

    initial_sign = 0
    for i in range(n):
        o = points[i]
        a = points[(i + 1) % n]
        b = points[(i + 2) % n]
        current_cross = cross(o, a, b)
        
        if current_cross != 0:
            initial_sign = 1 if current_cross > 0 else -1
            break
    
    # Verificamos que todos los productos cruzados tengan el mismo signo.
    for i in range(n):
        o = points[i]
        a = points[(i + 1) % n]
        b = points[(i + 2) % n]
        current_cross = cross(o, a, b)
        
        if current_cross * initial_sign < 0:
            return False  # Hay un cambio de signo? No es convexo.
    
    return True

def validate_figure(coords):
    if not is_closed(coords):
        raise ValueError("The figure is not closed.")
    if not is_convex(coords):
        raise ValueError("The figure is not convex.")
