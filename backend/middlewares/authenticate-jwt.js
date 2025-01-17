

export async function authenticateToken(request, response, next, auth) {
    const jwt = request.headers.authorization;
    if (!jwt) {
      response.status(401).json({ message: "Usuário não autorizado" });
      return;
    }

    let decodeIdToken = "";
    try {
      decodeIdToken = await auth.verifyIdToken(jwt, true);
    } catch (e) {
      response.status(401).json({ message: "Usuário não autorizado" });
      return;
    }

    request.user = {
      uid: decodeIdToken.sub,
    };

    next();
}
