export enum GameState {
    WAITING = "waiting",
    GAME_STARTING = "game_starting",
    QUESTION_ANSWER = "question_answer",
    TIMES_UP = "times_up",
    RESULTS_SHOWING = "results_showing",
    GAME_ENDED = "game_ended",
    DISCONNECTED = "disconnected",
}

export function is(this: GameState, state: GameState): boolean {
    return this === state;
}
