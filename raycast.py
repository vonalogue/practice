import math
import sys
import pygame

# -----------------------------
# Config
# -----------------------------
WIDTH, HEIGHT = 900, 540
FOV_DEG = 66
MOVE_SPEED = 3.2       # cells/second
ROT_SPEED = 2.2        # radians/second
WALL_COLOR = (200, 200, 200)
FLOOR_COLOR = (45, 45, 50)
CEIL_COLOR = (18, 18, 22)

# Simple map: '1' = wall, '0' = empty
MAP_STR = [
    "111111111111",
    "1..0......11",
    "1..0..111..1",
    "1..0..1....1",
    "1..0..1....1",
    "1..0..1....1",
    "1..0..1....1",
    "1..0..111..1",
    "1..........1",
    "111111111111",
]
# Use '.' and '0' as empty cells for flexibility
WORLD = [[1 if c == '1' else 0 for c in row] for row in MAP_STR]
MAP_W, MAP_H = len(WORLD[0]), len(WORLD)

# -----------------------------
# Helpers
# -----------------------------
def is_wall(x, y):
    """Return True if the (float) world coords collide with a wall."""
    ix, iy = int(x), int(y)
    if ix < 0 or iy < 0 or ix >= MAP_W or iy >= MAP_H:
        return True
    return WORLD[iy][ix] == 1

def clamp(v, lo, hi):
    return max(lo, min(hi, v))

# -----------------------------
# Main
# -----------------------------
def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Python Ray Casting (DDA)")
    clock = pygame.time.Clock()

    # Player start
    px, py = 2.5, 2.5       # world coords in map cells
    pa = math.radians(0)    # facing angle in radians

    # Precompute
    FOV = math.radians(FOV_DEG)
    HALF_FOV = FOV * 0.5

    # Render loop
    running = True
    while running:
        dt = clock.tick(90) / 1000.0  # seconds since last frame
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Input
        keys = pygame.key.get_pressed()
        if keys[pygame.K_ESCAPE]:
            running = False

        # Rotation
        if keys[pygame.K_LEFT]:
            pa -= ROT_SPEED * dt
        if keys[pygame.K_RIGHT]:
            pa += ROT_SPEED * dt

        # Movement (WASD: forward/back + strafing)
        dir_x = math.cos(pa)
        dir_y = math.sin(pa)
        right_x = math.cos(pa + math.pi / 2)
        right_y = math.sin(pa + math.pi / 2)

        move = 0.0
        strafe = 0.0
        if keys[pygame.K_w]:
            move += 1.0
        if keys[pygame.K_s]:
            move -= 1.0
        if keys[pygame.K_d]:
            strafe += 1.0
        if keys[pygame.K_a]:
            strafe -= 1.0

        step = MOVE_SPEED * dt
        nx = px + (dir_x * move + right_x * strafe) * step
        ny = py + (dir_y * move + right_y * strafe) * step

        # Simple collision: try axis-wise to slide along walls
        if not is_wall(nx, py):
            px = nx
        if not is_wall(px, ny):
            py = ny

        # Draw ceiling & floor
        screen.fill(CEIL_COLOR)
        pygame.draw.rect(screen, FLOOR_COLOR, (0, HEIGHT // 2, WIDTH, HEIGHT // 2))

        # Ray casting (DDA) — one ray per vertical screen column
        for x in range(WIDTH):
            # Camera space: from -1 (left) to +1 (right)
            cam_x = 2.0 * x / float(WIDTH) - 1.0
            # Ray direction via camera plane derived from FOV
            # Build a camera plane perpendicular to dir; length = tan(FOV/2)
            plane_x = -math.sin(pa) * math.tan(HALF_FOV)
            plane_y =  math.cos(pa) * math.tan(HALF_FOV)
            ray_dir_x = dir_x + plane_x * cam_x
            ray_dir_y = dir_y + plane_y * cam_x

            # Current grid square
            map_x = int(px)
            map_y = int(py)

            # Length of ray to next x or y grid boundary
            delta_x = abs(1.0 / ray_dir_x) if ray_dir_x != 0 else 1e30
            delta_y = abs(1.0 / ray_dir_y) if ray_dir_y != 0 else 1e30

            # Step and initial side distances
            if ray_dir_x < 0:
                step_x = -1
                side_dist_x = (px - map_x) * delta_x
            else:
                step_x = 1
                side_dist_x = (map_x + 1.0 - px) * delta_x

            if ray_dir_y < 0:
                step_y = -1
                side_dist_y = (py - map_y) * delta_y
            else:
                step_y = 1
                side_dist_y = (map_y + 1.0 - py) * delta_y

            # DDA loop
            hit = False
            side = 0  # 0 if hit on X side, 1 if hit on Y side
            max_steps = 2048
            steps = 0
            while not hit and steps < max_steps:
                if side_dist_x < side_dist_y:
                    side_dist_x += delta_x
                    map_x += step_x
                    side = 0
                else:
                    side_dist_y += delta_y
                    map_y += step_y
                    side = 1

                if map_x < 0 or map_y < 0 or map_x >= MAP_W or map_y >= MAP_H:
                    # Ray fell outside map: fake far distance
                    break
                if WORLD[map_y][map_x] == 1:
                    hit = True
                steps += 1

            # Distance to wall (perpendicular)
            if hit:
                if side == 0:
                    perp_dist = (map_x - px + (1 - step_x) / 2.0) / (ray_dir_x if ray_dir_x != 0 else 1e-6)
                else:
                    perp_dist = (map_y - py + (1 - step_y) / 2.0) / (ray_dir_y if ray_dir_y != 0 else 1e-6)
            else:
                perp_dist = 1e6  # nothing hit; draw nothing

            # Project wall slice
            if perp_dist > 0 and perp_dist < 1e5:
                line_h = int(HEIGHT / perp_dist)
                draw_start = clamp(HEIGHT // 2 - line_h // 2, 0, HEIGHT)
                draw_end   = clamp(HEIGHT // 2 + line_h // 2, 0, HEIGHT)

                # Basic shading: darker if hit on Y-side (gives a 3D feel)
                shade = 0.65 if side == 1 else 1.0
                r = int(WALL_COLOR[0] * shade)
                g = int(WALL_COLOR[1] * shade)
                b = int(WALL_COLOR[2] * shade)

                pygame.draw.line(screen, (r, g, b), (x, draw_start), (x, draw_end))

        # Tiny top-down mini-map & player
        draw_minimap(screen, px, py, pa)

        pygame.display.flip()

    pygame.quit()
    sys.exit()

def draw_minimap(screen, px, py, pa, scale=14):
    """Draw a small top-down map to help you navigate."""
    mm_w = MAP_W * scale
    mm_h = MAP_H * scale
    surf = pygame.Surface((mm_w, mm_h))
    surf.fill((12, 12, 14))
    for y in range(MAP_H):
        for x in range(MAP_W):
            color = (80, 80, 90) if WORLD[y][x] == 0 else (180, 180, 180)
            pygame.draw.rect(surf, color, (x * scale, y * scale, scale - 1, scale - 1))
    # Player
    pygame.draw.circle(surf, (255, 80, 80), (int(px * scale), int(py * scale)), max(2, scale // 5))
    # Facing line
    end_x = px + math.cos(pa) * 0.7
    end_y = py + math.sin(pa) * 0.7
    pygame.draw.line(surf, (255, 80, 80), (int(px * scale), int(py * scale)),
                     (int(end_x * scale), int(end_y * scale)), 2)
    # Blit to corner
    screen.blit(surf, (10, 10))

if __name__ == "__main__":
    main()
