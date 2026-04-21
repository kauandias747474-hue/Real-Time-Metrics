use std::net::UdpScoket;
use crate::storage::sink::DataSink;

pub fn start_udp_listener() {

    let socket = match UdpSocket::bind("127.0.0.1:8080") {
        Ok(s) => s,
        Err(e) => {
            eprintln!(" Erro ao abrir porta UDP: {}", e);
            return;
        }
    };

    println!(" [UDP] Servidor escutando na porta 8080...");

    let mut buf = [0; 1024];

    loop {
     
        match socket.recv_from(&mut buf) {
            Ok((size, src)) => {
                      let raw_data = String::from_utf8_lossy(&buf[..size]);
                println!("🔌 [UDP] Recebido de {}: {}", src, raw_data);

                
                DataSink::log_event(&format!("Dado UDP recebido: {}", raw_data));
            }
            Err(e) => {
                eprintln!(" Erro ao receber pacote UDP: {}", e);
            }
        }
    }
}
