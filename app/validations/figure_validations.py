def is_closed(coords, epsilon=1e-8):
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

def is_convex(coords, epsilon = 1e-10):
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

def validate_figure(coords):
    if not is_closed(coords):
        raise ValueError("The figure is not closed.")
    if not is_convex(coords):
        raise ValueError("The figure is not convex.")
