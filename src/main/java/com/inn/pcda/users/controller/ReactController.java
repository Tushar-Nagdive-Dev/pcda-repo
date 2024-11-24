package com.inn.pcda.users.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {

    @GetMapping(value = {"/", "/auth/**", "/dashboard/**"})
    public String forwardReactRoutes() {
        return "forward:/index.html"; // Forward to React's index.html
    }
}
