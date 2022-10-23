# Auth Server

Description: work in progress

## ToDo

- install guid jsonwebtoken

## Generate Secret

```node
require("crypto").randomBytes(64).toString("hex");
```
