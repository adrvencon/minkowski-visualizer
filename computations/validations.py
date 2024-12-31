def is_closed(coords):
    if len(coords) < 3:
        return False

    first_point = coords[0]
    last_point = coords[-1]

    return first_point == last_point

def is_convex(coords):
    pass # TODO: Comprobar que la figura sea convexa.

def validate_figure(coords):
    if not is_closed(coords):
        raise ValueError("The figure is not closed.")
    if not is_convex(coords):
        raise ValueError("The figure is not convex.")
