# 🚀 Rust-Metrics: The Deterministic Telemetry Engine

![Rust](https://img.shields.io/badge/rust-%23E32A1C.svg?style=for-the-badge&logo=rust&logoColor=white)
![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![gRPC](https://img.shields.io/badge/gRPC-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Zero-Copy](https://img.shields.io/badge/Zero--Copy-rkyv-orange?style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 🇧🇷 Português

### 🎯 Por que Rust-Metrics?
O **Rust-Metrics** nasceu para eliminar a incerteza. Em telemetria de alta escala, o "Garbage Collector" (GC) de linguagens como Go e Java causa pausas que resultam em perda de dados. Nosso motor utiliza Rust e C++ para garantir um processamento **determinístico** e latência estável em nível de microssegundos.

### 🏗️ Arquitetura Híbrida e Poliglota
Elevamos o projeto para um nível industrial, integrando cinco linguagens onde cada uma desempenha seu papel fundamental:

1.  **C++ (Native Core):** Localizado em `native-core/`. Responsável por cálculos matemáticos intensivos e otimizações de hardware (SIMD). Representa a integração com sistemas legados e performance bruta via FFI.
2.  **Rust (The Engine):** O coração do sistema. Gerencia a segurança de memória, concorrência assíncrona e a comunicação segura com o módulo C++.
3.  **Go (Control Plane):** O orquestrador de infraestrutura. Ideal para gerenciar deploys, containers e a saúde dos nós de telemetria.
4.  **Python (Analysis Plane):** Transforma dados brutos em insights usando Polars e Machine Learning para detecção de anomalias.
5.  **TypeScript (Visual Plane):** Dashboard de alta fidelidade que consome streams binários via gRPC-Web.

---

## 🇺🇸 English

### 🎯 Why Rust-Metrics?
**Rust-Metrics** was engineered to kill uncertainty. In high-throughput telemetry, Garbage Collection (GC) pauses are the enemy. By leveraging Rust and C++, we provide **deterministic** processing: no jitter, no data loss, just raw hardware-level performance.

### 🏗️ Hybrid & Polyglot Architecture
We've scaled this project to an industrial level, integrating five languages where each plays a strategic role:

1.  **C++ (Native Core):** Located in `native-core/`. Handles heavy math and hardware-level optimizations (SIMD). It showcases FFI integration and raw legacy-speed capabilities.
2.  **Rust (The Engine):** The system's heart. Manages memory safety, async concurrency, and secure interfacing with the C++ native module.
3.  **Go (Control Plane):** The infrastructure orchestrator. Perfect for managing deployments, containers, and telemetry node health.
4.  **Python (Analysis Plane):** Converts raw data into insights using Polars and ML for real-time anomaly detection.
5.  **TypeScript (Visual Plane):** High-fidelity dashboard consuming binary streams via gRPC-Web for real-time visualization.

---

## 🛠️ Arsenal de Ferramentas / Toolchain

| Camada / Layer | Ferramenta / Tool | Propósito / Purpose |
| :--- | :--- | :--- |
| **Native Compute** | `C++` | Otimização SIMD e Intrinsics de CPU. |
| **Engine Core** | `Rust` | Orquestração segura e I/O assíncrono (Tokio). |
| **FFI Bridge** | `libc / cc crate` | Ponte de alta performance entre Rust e C++. |
| **Serialization** | `gRPC / Protobuf` | Contrato universal (Single Source of Truth). |
| **Infrastructure** | `Go` | Orquestração de containers e Control Plane. |
| **Analytics** | `Python / Polars` | Inteligência estatística e detecção de anomalias. |
| **Frontend** | `TS / React` | Interface visual de baixa latência. |

---
**🚀 Como Iniciar / Quick Start**
Compilar Nativo:
*O Rust compilará o C++ automaticamente via build.rs.*

Gerar Contratos: 
*make gen-proto*

Executar Motor: 
*cargo run --release*

Analisar: 
*python sdk-python/client.py*

**📜 Licença / License:** 
*MIT License. Free for all.*

---


## 📂 Estrutura de Pastas / Project Structure

```text
├── src/                # Rust Engine (Safe Core)
├── native-core/        # C++ Native Module (Performance Core)
├── proto/              # gRPC Contracts (Source of Truth)
├── sdk-go/             # Cloud Orchestrator (Go)
├── sdk-python/         # Data Analysis (Python)
├── dashboard-ts/       # Real-time UI (TypeScript)
├── benches/            # Performance Benchmarks (Criterion)
└── .github/workflows/  # CI/CD & Auto-Profiling
