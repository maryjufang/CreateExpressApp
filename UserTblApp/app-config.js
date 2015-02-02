'use strict';

var config = new function() {
    this.mysqlconnection = {
        host: 'dev1.valiantica.com',
        user: 'dev1',
        password: 'valianticano1',
        database: 'test'
    }

    //this.serversetting = {
    //    mailserver: "gmail",
    //    default_sender_mail: "maryjufangchen@gmail.com",
    //    default_sender_name: "Jufang Chen"
    //}

    //this.gmail = {
    //    mail_user: "maryjufangchen@gmail.com",
    //    mail_clientId: "72606887906-l72v7an9rtjsif1vvs2lnbaqvprog2hh.apps.googleusercontent.com",
    //    mail_clientSecret: "jOLJw_KHpgwohqqLXZE2F_2D",
    //    mail_refreshToken: "1/8eHeCzNLxnLZjjQdck2WWHPPfteeELS3hLefTWpQkqI",
    //    mail_accessToken: "ya29.mAAMslglVQzsuQHqU8E74Pg48Ove4SF3ZICQKtEffVF6BCl8zjfhYnWw",
    //    mail_timeout: 3600
    //}
}
//Export singleton config object;
module.exports = config;