#  SDK de Telemetria (Go Agent) / SDK de Telemetria (Agente Go)

---

## 🇺🇸 English Version

### **Overview & Architecture**
This module is a **High-Performance Agent** built in Go, designed to act as the edge layer in a distributed observability ecosystem. It functions as the data collection "arm" that communicates with a **Memory-Safe Processing Engine (Rust)** and a **Mathematical Calculation Core (C++)**.

The choice of Go for this SDK is justified by its efficiency in I/O and concurrency management through *goroutines*, allowing the agent to listen to multiple sensors simultaneously with low CPU overhead.

### **How It Works: The Metric Lifecycle**
1.  **Capture:** The agent collects raw data (e.g., sensor ID, temperature, or values).
2.  **gRPC Streaming (HTTP/2):** Unlike traditional REST APIs, this SDK opens a **Client-Side Streaming** channel. This allows continuous sending of binary packets without the need to renegotiate the TCP handshake for every message.
3.  **Protobuf Contract:** Data is serialized into a binary format, reducing payload size by up to 80% compared to JSON.
4.  **Batch Processing:** The Rust engine receives the stream and, upon the closing signal (`CloseAndRecv`), delegates the data to a C++ library via **FFI (Foreign Function Interface)** for intensive statistical calculations.

### **Applied Engineering Concepts**
* **Language Agnosticism:** Using gRPC as a bridge between languages with different paradigms.
* **Interface Satisfaction:** Manual implementation of `proto.Message` interface methods to ensure compatibility with generated types.
* **Insecure Dialing:** Use of insecure credentials for local development, abstracting TLS layers for rapid prototyping.
* **Backpressure & Latency:** Optimization of the sending interval (`time.Sleep`) to balance throughput between the sensor and the Rust motor.

### **Critical Errors Handled & Fixed**

| Error | Root Cause | Applied Solution |
| :--- | :--- | :--- |
| **`Want Proto.Message`** | Manual structs did not satisfy the gRPC interface. | Implemented `Reset()`, `String()`, and `ProtoMessage()` methods in the bindings file. |
| **`Connection Refused`** | Firewall/Antivirus blocking gRPC binary packets or IPv4/IPv6 conflict. | Synchronized IP to `127.0.0.1` (IPv4) and added port exceptions in the security module. |
| **`Package Shadowing`** | Name conflict between the telemetry package and Go's `main`. | Restructured folders (`gen/telemetry`) and configured internal imports via `go.mod`. |
| **`RPC Closed Early`** | Infinite loop in Go prevented Rust from finishing the calculation and responding. | Implemented `CloseAndRecv` flow, allowing graceful stream termination by the client. |
| **`Empty Response`** | Missing mandatory fields in the Protobuf response struct. | Fully populated the `MetricResponse` struct in Rust to satisfy the Go contract. |

### **How to Run**
1.  **Dependencies:** Inside the `sdk-go` folder, run `go mod tidy`.
2.  **Execution:** Run `go run main.go`.
    * *Note: The Rust server must be running on 127.0.0.1:50051.*

---

## 🇧🇷 Versão em Português

### **Visão Geral e Arquitetura**
Este módulo é um **Agente de Alta Performance** desenvolvido em Go, projetado para atuar como a camada de borda (edge) em um ecossistema de observabilidade distribuída. Ele funciona como o "braço" de coleta de dados que se comunica com um **Motor de Processamento de Memória Segura (Rust)** e um **Núcleo de Cálculo Matemático (C++)**.

A escolha do Go para este SDK justifica-se pela sua eficiência em I/O e gerenciamento de concorrência através de *goroutines*, permitindo que o agente escute múltiplos sensores simultaneamente com baixo overhead de CPU.

### **Como Funciona: O Ciclo de Vida da Métrica**
1.  **Captura:** O agente coleta dados brutos (ex: ID do sensor, temperatura ou valores).
2.  **Streaming gRPC (HTTP/2):** Diferente de APIs REST tradicionais, este SDK abre um canal de **Client-Side Streaming**. Isso permite o envio contínuo de pacotes binários sem a necessidade de renegociar o *handshake* TCP a cada mensagem.
3.  **Contrato Protobuf:** Os dados são serializados em formato binário, reduzindo o tamanho do payload em até 80% comparado ao JSON.
4.  **Processamento em Lote:** O motor Rust recebe o stream e, após o sinal de fechamento (`CloseAndRecv`), delega os dados para uma biblioteca C++ via **FFI (Foreign Function Interface)** para cálculos estatísticos intensivos.

### **Conceitos de Engenharia Aplicados**
* **Agnosticismo de Linguagem:** Uso de gRPC como ponte entre linguagens com paradigmas diferentes.
* **Satisfação de Interface:** Implementação manual de métodos da interface `proto.Message` para garantir compatibilidade com tipos gerados.
* **Discagem Insegura (Insecure Dialing):** Uso de credenciais inseguras para desenvolvimento local, abstraindo camadas de TLS para prototipagem rápida.
* **Backpressure e Latência:** Otimização do intervalo de envio (`time.Sleep`) para balancear o volume de dados entre o sensor e o motor Rust.

### **Erros Críticos Tratados e Corrigidos**

| Erro | Causa Raiz | Solução Aplicada |
| :--- | :--- | :--- |
| **`Want Proto.Message`** | Structs manuais não satisfaziam a interface do gRPC. | Implementação dos métodos `Reset()`, `String()` e `ProtoMessage()` no arquivo de bindings. |
| **`Connection Refused`** | Firewall/Antivírus bloqueando pacotes ou conflito IPv4/IPv6. | Sincronização de IP para `127.0.0.1` (IPv4) e adição de exceções de porta no Antivírus. |
| **`Package Shadowing`** | Conflito de nomes entre o pacote de telemetria e o `main` do Go. | Reestruturação de pastas (`gen/telemetry`) e configuração de imports via `go.mod`. |
| **`RPC Closed Early`** | Loop infinito no Go impedia o Rust de finalizar o cálculo e responder. | Implementação do fluxo `CloseAndRecv`, permitindo o encerramento gracioso pelo cliente. |
| **`Empty Response`** | Falta de campos obrigatórios na struct de resposta do Protobuf. | Preenchimento total da struct `MetricResponse` no Rust para satisfazer o contrato. |

### **Como Rodar**
1.  **Dependências:** Dentro da pasta `sdk-go`, execute `go mod tidy`.
2.  **Execução:** Execute `go run main.go`.
    * *Nota: O servidor Rust deve estar rodando em 127.0.0.1:50051.*
