use std::net::UdpSocket; 
use crate::storage::DataSink;

pub fn start_udp_server() {
 
    let socket = UdpSocket::bind("127.0.0.1:8080").expect("Erro ao ligar servidor UDP");
    let mut buf = [0; 1024];

    println!(" Servidor UDP escutando em 127.0.0.1:8080");

    loop {
        if let Ok((size, _)) = socket.recv_from(&mut buf) {
            let raw_data = String::from_utf8_lossy(&buf[..size]);
           
            DataSink::log_event(&format!("Dado UDP recebido: {}", raw_data));
        }
    }
}
