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
                {"value": "EAR-1"},
                {"value": "GEE-2"},
                {"value": "TRI-3"},
                {"value": "SON-4"},
                {"value": "QUI-5"},
                {"value": "LIM-6"},
                {"value": "BLE-7"}
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

const routes = [
    {path: "form1", type: "form", data: {metaUrl: "http://fis:3000/form"}},
    {path: "form2", type: "form", data: {metaUrl: "http://fis:3000/form"}}
];

 const sampleProfiles = [
    {
      "remark": "Proident consequat ad culpa irure eu culpa aliqua sunt enim consectetur cupidatat sint cillum.",
      "cred_limit": "947.11",
      "date_create": "2016-08-19",
      "term": 4,
      "acc_code": "EAR-1",
      "acc_name": "EARTHWAX"
    },
    {
      "remark": "Eiusmod cupidatat velit elit id duis qui sint mollit minim cupidatat tempor aliquip cupidatat.",
      "cred_limit": "982.66",
      "date_create": "2017-02-07",
      "term": 28,
      "acc_code": "GEE-2",
      "acc_name": "GEEKKO"
    },
    {
      "remark": "Cillum et aute mollit mollit occaecat sint amet excepteur qui.",
      "cred_limit": "767.44",
      "date_create": "2014-07-26",
      "term": 13,
      "acc_code": "TRI-3",
      "acc_name": "TRI@TRIBALOG"
    },
    {
      "remark": "Cillum elit elit deserunt quis nulla aute nostrud voluptate pariatur deserunt.",
      "cred_limit": "2178.77",
      "date_create": "2014-01-05",
      "term": 3,
      "acc_code": "SON-4",
      "acc_name": "SONIQUE"
    },
    {
      "remark": "Eu duis aute id nulla pariatur nulla veniam.",
      "cred_limit": 9029,
      "date_create": "2014-12-04",
      "term": 26,
      "acc_code": "QUI-5",
      "acc_name": "QUIZMO"
    },
    {
      "remark": "Irure dolor cupidatat labore aliquip enim reprehenderit aute proident.",
      "cred_limit": "9314.6",
      "date_create": "2017-09-08",
      "term": 30,
      "acc_code": "LIM-6",
      "acc_name": "LIMAGE"
    },
    {
      "remark": "Quis ullamco qui occaecat pariatur anim occaecat esse enim eu.",
      "cred_limit": "9035.1",
      "date_create": "2015-05-18",
      "term": 11,
      "acc_code": "BLE-7",
      "acc_name": "BLEENDOT"
    }
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

 export let getRoutes = (req: Request, res: Response) => {
    res.json(routes);
 };


let log: string = "Manually refresh this page to see changes";

 /*
 * GET /form/log
 */
export let getFormLog = (req: Request, res: Response) => {

    res.send(log);
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
    const reqAccCode = req.body.acc_code;
    const selectedProf = sampleProfiles.find(i => i.acc_code === reqAccCode);
    log += "<br/>" + "receiving POST for " + reqAccCode;
    res.setHeader("Content-Type", "application/json");
    res.json(selectedProf);
    log += "<br/>" + JSON.stringify(selectedProf);
};