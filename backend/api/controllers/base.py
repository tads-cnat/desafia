from ninja_extra import ModelControllerBase


class ModelController(ModelControllerBase):
    def get_queryset(self):
        return self.model.objects.all()
