require("dotenv-safe").load();
require("./config/mongodb.test").runTests();
require("./server/server.test").runTests();
require("./repository/repository.test").runTests();
require("./api/planets.test").runTests();
