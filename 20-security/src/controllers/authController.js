const publicRoute = (req, res) => {
    res.send('This is a public route');
};

const vipRoute = (req, res) => {
    res.send('This is a VIP route');
};

const adminRoute = (req, res) => {
    res.send('This is an admin route');
};

export {
    publicRoute,
    vipRoute,
    adminRoute
};