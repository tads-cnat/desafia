def add_slash(get_response):
    def middleware(request):
        if not request.path.endswith('/'):
            request.path_info = request.path = f"{request.path}/"
        return get_response(request)

    return middleware
