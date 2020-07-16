import { Router, Request, Response } from "express";

const ejemploRoutes = Router();

ejemploRoutes.get("/ejemplo", (req: Request, res: Response) => {

    res.json({
        ok:true,
        mensaje:'Todo ok, desde el GET de la ruta /ejemplo'
    });

});

ejemploRoutes.post("/ejemplo", (req: Request, res: Response) => {    
    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;

    res.json({
        ok:true,
        mensaje:'Todo ok, desde el POST de la ruta /ejemplo',
        cuerpo,
        de
    });


});

ejemploRoutes.post("/ejemplo/:id", (req: Request, res: Response) => {

    const cuerpo    = req.body.cuerpo;
    const de        = req.body.de;
    const id        = req.params.id;

    res.json({
        ok:true,
        mensaje:'Todo esta post',
        cuerpo,
        de,
        id
    });

});


export default ejemploRoutes;

