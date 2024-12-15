const checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.headers['role'];

        if (userRole === role) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
};

export default checkRole;