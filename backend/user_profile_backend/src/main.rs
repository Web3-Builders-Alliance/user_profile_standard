use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::process::Command;
use regex::Regex;

#[get("/")]
async fn deploy_program() -> impl Responder {
    Command::new("solana")
        .args(["-V"])
        .output()
        .expect("Solana not found");
    Command::new("anchor")
        .args(["-V"])
        .output()
        .expect("Anchor not found");
    let output =   Command::new("anchor")
        .args(["deploy", "--program-name", "user_profile_standard"])
        .output()
        .expect("Anchor not found");
    let re = Regex::new(r"Program Id: (?<pid>\w*)\n").unwrap();
    let rtn_str ; 
    if !output.status.success() { panic!("Could not deploy!"); }
    match String::from_utf8(output.stdout) {
        Ok(output) => {
            let pid = re.captures(output.as_str()).unwrap();
            println!("pid is: {:?}", &pid["pid"]);
            rtn_str = format!("Your PID is {:?}", &pid["pid"]);
        }
        Err(e) => panic!("Could not parse output {e}")
    }
    HttpResponse::Ok().body(rtn_str)
}

#[actix_web::main]
async fn main() -> std::io::Result<()>{
    println!("Listening on port 8080");
    HttpServer::new(|| {
        App::new()
            .service(deploy_program)
    })
        .bind(("127.0.0.1", 8080))?
        .run()
    .await
}

