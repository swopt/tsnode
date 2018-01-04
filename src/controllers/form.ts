import { Request, Response, NextFunction } from "express";

const formSample = {data:  {"meta_id": "personal",
    "title": "Personnel",
    "endpoints": {
        "insert": { "method": "post", "url": "personal/save" },
        "list"  : { "method": "get",  "url": "http://fis:3000/form/profile" }
    },
    "fields": [
        {
            "key": "acc_code",
            "label": "Account Code",
            "type": "reference_value",
            "required": true,
            "reference_values": [
                {"value": "AIR02-01"},
                {"value": "MAL04-01"},
                {"value": "MAL05-01"},
                {"value": "MAL06-01"},
                {"value": "RAY04-01"}
            ]
        },
        {
            "key": "acc_name",
            "label": "Account Name",
            "type": "string",
            "required": true
        },
        {"key": "term", "label": "Term (days)", "type": "number"},
        {"key": "date_create", "label": "Date Created", "type": "date"},
        {"key": "cred_limit", "label": "Credit Limit", "type": "number", "step": 0.01},
        {
            "key": "remark",
            "label": "Remark",
            "type": "string_multiline"
        }
    ]
}};

 const sampleProfiles = [
    {"acc_code": "AIR02-01", "acc_name": "AirAsia Berhad", "term": 30, "date_create": "2018-01-01", "cred_limit": 2999.99, "remark": "the quick brown fox jumps over the lazy dog"},
    {"acc_code": "MAL04-01", "acc_name": "Malaysia Airlines Berhad", "nature": "Credit"},
    {"acc_code": "MAL05-01", "acc_name": "Firefly", "nature": "Credit"},
    {"acc_code": "MAL06-01", "acc_name": "MASWings", "nature": "Credit"},
    {"acc_code": "RAY04-01", "acc_name": "Raya Airways", "nature": "Credit"}
];

const sql = require("mssql");
const sqlConfig = {
    server: "dbserv\\sql2k8",
    database: "FISMAF313GST",
    user: "eric",
    password: "sw0pt3r1c",
    port: 1433
};

// let prgTree = [{}];

/**
 * GET /form
 */
 export let getForm = (req: Request, res: Response) => {
     res.json(formSample);
 };


 export let getPrgTree = (req: Request, res: Response) => {
    sql.connect(sqlConfig, function(err: any) {
        if (err) {console.log(err); sql.close(); }
        const sqlReq = new sql.Request();
        sqlReq.query("select * from prg_profile where prg_display = 'Y' order by subs_code,prg_type", function (err: any, recordset: any) {
            if (err) {console.log(err); sql.close(); }
            res.json(recordset);
            sql.close();
        });
    });
};

/*
 * POST /form/profile
 */

export let postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    const reqAccCode = req.body.acccode;
    const selectedProf = sampleProfiles.find(i => i.acc_code === reqAccCode);
    console.log("receiving post update for " + reqAccCode);
    res.setHeader("Content-Type", "application/json");
    res.json(selectedProf);
    console.log("response for " + reqAccCode + " is " + JSON.stringify(selectedProf));
};