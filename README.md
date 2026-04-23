#  Real-Time Metrics

![Rust](https://img.shields.io/badge/rust-%23E32A1C.svg?style=for-the-badge&logo=rust&logoColor=white)
![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![gRPC](https://img.shields.io/badge/gRPC-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Zero-Copy](https://img.shields.io/badge/Zero--Copy-rkyv-orange?style=for-the-badge)

---

## 🇧🇷 Português

###  A Ciência por trás do Real-Time Metrics
O **Real-Time Metrics** foi projetado para resolver o problema da volatilidade em sistemas de telemetria industrial. Enquanto dashboards comuns sofrem com atrasos de processamento e pausas de Garbage Collection (GC), nossa arquitetura elimina gargalos através de um pipeline de processamento vetorial:

* **SIMD (Single Instruction, Multiple Data):** Utilizamos o C++ para executar instruções paralelas diretamente no hardware, permitindo que uma única instrução de CPU processe múltiplos pacotes de métricas simultaneamente.
* **Memória Lock-Free & Estruturas Não-Bloqueantes:** O motor Rust utiliza canais atômicos para garantir que a troca de dados entre o núcleo de performance e a rede nunca cause "contention" ou bloqueio de threads.
* **Zero-Copy Data Flow:** Do binário C++ ao gRPC-Web, o dado permanece em buffers contíguos na memória, evitando o overhead de alocação e desalocação (Heap) no hot-path do sistema.

###  Arquitetura Híbrida e Poliglota
Este ecossistema integra cinco linguagens onde cada uma desempenha um papel estratégico para garantir escalabilidade industrial:

1.  **C++ (Native Core):** Localizado em `native-core/`. Especializado em aritmética de alta densidade e otimizações de nível de registrador. É o ponto de entrada para dados brutos de hardware.
2.  **Rust (The Engine):** O cérebro do sistema. Gerencia a segurança de memória (Borrow Checker), orquestração assíncrona via `Tokio` e a interface segura (FFI) com o módulo C++.
3.  **Go (Control Plane):** O orquestrador de infraestrutura. Gerencia a descoberta de serviços, saúde dos nós e a escalabilidade da rede de containers que sustenta o tráfego.
4.  **Python (Analysis Plane):** Camada de inteligência estatística. Utiliza `Polars` (processamento de DataFrames em Rust) e modelos de ML para identificar anomalias e tendências em tempo real.
5.  **TypeScript (Visual Plane):** Dashboard React de alta fidelidade. Consome streams binários gRPC e utiliza buffers circulares para renderizar gráficos a 60fps sem sobrecarregar a thread principal do navegador.

---

## 🇺🇸 English

###  The Engineering of Real-Time Metrics
**Real-Time Metrics** was engineered to eliminate volatility in industrial telemetry. While standard dashboards suffer from processing lag and Garbage Collection (GC) spikes, our architecture removes bottlenecks through a vectorized processing pipeline:

* **SIMD (Single Instruction, Multiple Data):** We leverage C++ to execute parallel instructions directly on the hardware, allowing a single CPU clock cycle to process multiple metric packets simultaneously.
* **Lock-Free Memory & Non-Blocking Structures:** The Rust engine utilizes atomic channels to ensure that data exchange between the performance core and the network never causes thread contention or locking.
* **Zero-Copy Data Flow:** From the C++ binary to gRPC-Web, data remains in contiguous memory buffers, bypassing the overhead of allocation and deallocation (Heap) within the system's hot-path.

###  Hybrid & Polyglot Architecture
This ecosystem integrates five languages, each playing a strategic role to ensure industrial-grade scalability:

1.  **C++ (Native Core):** Located in `native-core/`. Specialized in high-density arithmetic and register-level optimizations. It serves as the primary entry point for raw hardware data.
2.  **Rust (The Engine):** The system's heart. Manages memory safety (Borrow Checker), async orchestration via `Tokio`, and the secure FFI interface with the C++ native module.
3.  **Go (Control Plane):** The infrastructure orchestrator. Manages service discovery, node health, and the scalability of the container network supporting the traffic.
4.  **Python (Analysis Plane):** The statistical intelligence layer. Uses `Polars` (Rust-powered DataFrames) and ML models to identify real-time anomalies and trends.
5.  **TypeScript (Visual Plane):** High-fidelity React dashboard. Consumes binary gRPC streams and utilizes circular buffers to render charts at 60fps without choking the browser's main thread.

---

## 🛠️ Arsenal Técnico / Technical Arsenal

| Camada / Layer | Tecnologia / Tech | Foco de Engenharia / Engineering Focus |
| :--- | :--- | :--- |
| **Native Compute** | `C++ 20` | SIMD Intrinsics, AVX2/NEON optimizations. |
| **Engine Core** | `Rust (Stable)` | Async I/O, Ownership, Zero-cost abstractions. |
| **Data Bridge** | `FFI / bindgen` | High-speed C-to-Rust memory boundary. |
| **Communication** | `gRPC / Protobuf` | Binary streaming & Single Source of Truth. |
| **Orchestration** | `Go` | Lightweight concurrency for infrastructure. |
| **Data Science** | `Python / Polars` | Vectorized DataFrame processing & ML. |
| **Frontend** | `React / TS` | Circular Buffers & RequestAnimationFrame UI. |

---

## 📂 Estrutura do Projeto / Project Structure

```text
.
├── src/                    # Rust Engine Core (Safety & Concurrency)
├── native-core/            # C++ Performance Modules (SIMD/Math)
│   ├── include/            # C++ FFI Headers
│   └── src/                # Raw C++ Hardware Logic
├── proto/                  # Protobuf Contracts (Language-Agnostic)
├── dashboard-ts/           # React Dashboard (52 files - High Fidelity UI)
│   ├── src/services/       # gRPC-Web Stream Management
│   └── src/context/        # Circular Buffer & Telemetry State
├── sdk-go/                 # Cloud Orchestrator (Infrastructure)
├── sdk-python/             # Analysis SDK (Anomaly Detection)
├── benches/                # Criterion Benchmarks (Rust vs C++)
└── scripts/                # Automation & Proto-Generation
