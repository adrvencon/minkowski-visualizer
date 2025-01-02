def is_closed(coords):
    if len(coords) < 3:
        return False

    first_point = coords[0]
    last_point = coords[-1]

    return first_point == last_point

def is_convex(coords):
    if len(coords) < 4:
        return True

    def cross_product(o, a, b):
        # (a - o) x (b - o)
        return (a['x'] - o['x']) * (b['y'] - o['y']) - (a['y'] - o['y']) * (b['x'] - o['x'])

    last_sign = 0
    epsilon = 1e-10  # Tolerancia por precisión en interpolación de puntos.

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

def validate_figure(coords):
    if not is_closed(coords):
        raise ValueError("The figure is not closed.")
    if not is_convex(coords):
        raise ValueError("The figure is not convex.")
