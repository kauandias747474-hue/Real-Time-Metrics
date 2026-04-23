package main

import (
	"log"
	"time"

	"sdk-go/client"package main

import (
	"context"
	"log"
	"math/rand"
	"os"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"


	pb "sdk-go/gen/telemetry"
)

func main() {
	
	addr := os.Getenv("SERVER_ADDR")
	if addr == "" {
		addr = "127.0.0.1:50051"
	}

	
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("ERRO DE CONEXÃO: %v", err)
	}
	defer conn.Close()

	
	client := pb.NewMetricsIngestorClient(conn)
	stream, err := client.SendMetricsStream(context.Background())
	if err != nil {
		log.Fatalf("ERRO AO ABRIR STREAM: %v", err)
	}

	log.Println(">>> Conectado ao Rust! Enviando 50 métricas...")

	for i := 1; i <= 50; i++ {
		val := 20.0 + rand.Float32()*5.0
		
		req := &pb.MetricRequest{
			SensorId:  "SENSOR_GO_01",
			Value:     val,
			Timestamp: time.Now().Unix(),
		}

		if err := stream.Send(req); err != nil {
			log.Printf("Erro ao enviar pacote %d: %v", i, err)
			break
		}
		
		log.Printf("[%d] Enviado: %.2f", i, val)
		time.Sleep(50 * time.Millisecond) 
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("ERRO RPC: O servidor falhou ao responder: %v", err)
	}

	log.Printf("\n--- RESPOSTA DO MOTOR RUST/C++ ---")
	log.Printf("Sucesso: %v", res.Success)
	log.Printf("Mensagem: %s", res.Message)
	log.Printf("Desvio Padrão: %.4f", res.CalculatedStdDev)
	log.Printf("----------------------------------\n")
}
	"sdk-go/metrics"
)

func main() {

	motor, err := client.InitClient("localhost:50051")
	if err != nil {
		log.Fatalf("Falha na conexão: %v", err)
	}

	defer motor.Conn.Close() 

	log.Println("Conectado ao motor Rust via gRPC Stream.")

	for {
		m := metrics.NewMetric("SENSOR_A1", 25.4)
		motor.EnviarParaMotor(m)
		
		time.Sleep(2 * time.Second)
	}
}
