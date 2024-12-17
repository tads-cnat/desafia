import json


class ActionDispatcher:
    def __init__(self):
        self.handlers = {}

    def register_handler(self, action, handler):
        self.handlers[action] = handler

    async def dispatch(self, consumer, data):
        action = data.get("action")
        if action in self.handlers:
            await self.handlers[action].handle(consumer, data)
        else:
            await consumer.send(text_data=json.dumps({
                "error": f"Handler for action '{action}' not found."
            }))
