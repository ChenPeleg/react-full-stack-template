import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    route("/", "./routes/index.tsx"),
    route("/example", "./routes/example.tsx"),
    route("/register", "./routes/register.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/logout", "./routes/logout.tsx"),
    route("/profile", "./routes/profile.tsx"),
    route("/home", "./routes/home.tsx" ),
    route("/api", './routes/api/api.tsx' ,  [
        route('log-error', './routes/api/errors-log.tsx'),
    ]),
    route("/about/register", "./routes/_about.register.tsx"),
    route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/bots/[.]well-known.tsx")
] satisfies RouteConfig;
