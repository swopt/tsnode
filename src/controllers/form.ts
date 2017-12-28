import { Request, Response, NextFunction } from "express";

const formSample = {data: {
    formTitle: "Sample Form",
    formGroups: [
        {
            title: "Sample Group 1",
            controlItems: [
                {"key": "accCode", "label": "Account Code", "controlType": "textboxauto", "required": true, "options": [{"value": "AIR02-01"}, {"value": "MAL04-01"}, {"value": "MAL05-01"}, {"value": "MAL06-01"}, {"value": "RAY04-01"}]},
                {"key": "accName", "label": "Account Name", "controlType": "textbox", "required": true},
                {"key": "remark", "label": "Remark", "controlType": "textarea"},
                {"key": "accStatus", "label": "Account Status", "value": "Active", "controlType": "dropdown", "options": [{"key": "active", "value": "Active"}, {"key": "dactive", "value": "Deactivated"}]},
                {"key": "term", "label": "Term (days)", "type": "number", "step": 0.01, "controlType": "textbox"},
                {"key": "dateCreate", "label": "Date Created", "controlType": "textbox", "type": "date"},
                {"key": "credLimit", "label": "Credit Limit", "controlType": "textbox", "type": "number", "step": 0.01},
                {"key": "credAvail", "label": "Credit Available", "controlType": "textbox", "type": "number", "step": 0.01},
                {"key": "debBal", "label": "Debit Balance", "controlType": "textbox", "type": "number", "step": 0.01},
                {"key": "credBal", "label": "Credit Balance", "controlType": "textbox", "type": "number", "step": 0.01},
                {"key": "outBal", "label": "Outstanding Balance", "controlType": "textbox", "type": "number", "step": 0.01}
            ]
        }
    ]
 }};

 const sampleProfiles = [
    {"accCode": "AIR02-01", "accName": "AirAsia Berhad", "orgnName": "Mafrica Corporation - M00 (Sibu HQ)", "orgnCode": "M00", "nature": "Credit"},
    {"accCode": "MAL04-01", "accName": "Malaysia Airlines Berhad", "orgnName": "Mafrica Corporation - M00 (Sibu HQ)", "orgnCode": "M00", "nature": "Credit"},
    {"accCode": "MAL05-01", "accName": "Firefly", "orgnName": "Mafrica Corporation - M00 (Sibu HQ)", "orgnCode": "M00", "nature": "Credit"},
    {"accCode": "MAL06-01", "accName": "MASWings", "orgnName": "Mafrica Corporation - M00 (Sibu HQ)", "orgnCode": "M00", "nature": "Credit"},
    {"accCode": "RAY04-01", "accName": "Raya Airways", "orgnName": "Mafrica Corporation - M00 (Sibu HQ)", "orgnCode": "M00", "nature": "Credit"}
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
    const selectedProf = sampleProfiles.find(i => i.accCode === reqAccCode);
    res.setHeader("Content-Type", "application/json");
    res.json(selectedProf);
};