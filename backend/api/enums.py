from enum import Enum


class GameState(Enum):
    WAITING = "waiting"
    GAME_STARTING = "game_start"
    QUESTION_ANSWER = "question_answer"
    TIMES_UP = "times_up"
    RESULTS_SHOWING = "results_showing"
    GAME_ENDED = "game_ended"
    DISCONNECTED = "disconnected"
    PLAYER_JOINED = "player_joined"


def is_valid_game_state(value):
    try:
        GameState(value)
        return True
    except ValueError:
        return False
