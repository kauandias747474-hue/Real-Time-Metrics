package main

import (
	"log"
	"time"

	"sdk-go/client"
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
