
```markdown
# Comprehensive Site Reliability Engineer (SRE) Interview Guide

## Core SRE Concepts

### 1. Explain the SRE Pillars with Examples
**Question**: What are the fundamental principles of SRE and how do they manifest in practice?

**Answer**:
```markdown
1. **Service Level Objectives (SLOs)**
   - *Definition*: Target reliability measured through SLIs
   - *Example*: "99.95% monthly availability for API endpoints"
   - *Implementation*: 
     ```promql
     # Prometheus SLO query for HTTP availability
     100 * (sum(rate(http_requests_total{code!~"5.."}[4w])) / sum(rate(http_requests_total[4w])))
     ```

2. **Error Budgets**
   - *Calculation*: `Error Budget = 1 - SLO`
   - *Example*: For 99.9% SLO, 0.1% budget = 43m 49s downtime/month
   - *Usage*: Feature launches must consume <30% of budget

3. **Toil Elimination**
   - *Identification*: Manual, repetitive tasks without long-term value
   - *Example*: Automated certificate rotation using:
     ```bash
     # Cert-manager Kubernetes CRD
     kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml
     ```

4. **Release Engineering**
   - *Strategies*: 
     - Blue-green (100% cutover)
     - Canary (1% → 5% → 25% traffic)
     - Feature flags (launchdarkly)
```

### 2. Incident Management Deep Dive
**Question**: Walk through your complete incident response protocol

**Answer**:
```markdown
1. **Detection**
   - Tools: Prometheus AlertManager, Opsgenie
   - Example alert rule:
     ```yaml
     # Prometheus alert for high latency
     - alert: HighAPILatency
       expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[1m])) > 2
       for: 5m
       labels:
         severity: page
       annotations:
         summary: "API latency >2s (99th %ile)"
     ```

2. **Triage**
   - Runbook checklist:
     1. Check dashboards (Grafana)
     2. Verify recent deploys (ArgoCD)
     3. Examine logs (Loki/ELK)
     4. Test dependencies (DB, cache)

3. **Resolution**
   - Common actions:
     ```bash
     # Kubernetes emergency rollback
     kubectl rollout undo deployment/my-app --to-revision=3
     ```

4. **Postmortem**
   - Structure:
     - Impact (downtime, users affected)
     - Root cause (5 Whys analysis)
     - Action items (with owners)
     - Example: Implement circuit breakers for DB calls
```

## Advanced Technical Questions

### 1. Distributed Systems Failure Modes
**Question**: How would you design a resilient payment processing system?

**Answer**:
```markdown
**Architecture Components**:
1. **Idempotency Layer**
   - Example: Redis-based request deduplication
   ```python
   def process_payment(payment_id):
       if redis.get(f"processed:{payment_id}"):
           return False
       # Process payment
       redis.setex(f"processed:{payment_id}", 3600, "1")
   ```

2. **Circuit Breakers**
   - Hystrix configuration:
   ```java
   @HystrixCommand(
     fallbackMethod = "getCachedRates",
     commandProperties = {
       @HystrixProperty(name="circuitBreaker.errorThresholdPercentage", value="50"),
       @HystrixProperty(name="circuitBreaker.sleepWindowInMilliseconds", value="10000")
     }
   )
   ```

3. **Saga Pattern**
   - Compensation transactions:
   ```
   Begin Payment Saga:
     1. Reserve funds → Success
     2. Update ledger → Failed
     Execute compensation:
     1. Refund reservation
   ```

4. **Monitoring**:
   - Key metrics:
     - Payment success rate
     - DB replication lag
     - P99 authorization latency
```

### 2. Kubernetes Failure Scenarios
**Question**: Your cluster nodes are becoming NotReady. How do you diagnose?

**Answer**:
```markdown
**Diagnosis Workflow**:

1. **Node Status Check**
   ```bash
   kubectl get nodes -o wide
   kubectl describe node <node-name> | grep -i "condition"
   ```

2. **Component Logs**
   ```bash
   # Control plane components
   journalctl -u kubelet --no-pager -n 100
   kubectl logs -n kube-system kube-apiserver-master-1
   ```

3. **Common Issues**:
   - **Disk Pressure**:
     ```bash
     df -h /var/lib/kubelet
     du -sh /var/log/pods/*
     ```
   - **Network Plugin**:
     ```bash
     kubectl get pods -n kube-system | grep -E 'flannel|calico'
     iptables-save | grep KUBE
     ```

4. **Recovery**:
   - Cordon affected nodes:
     ```bash
     kubectl cordon <node>
     kubectl drain <node> --ignore-daemonsets
     ```
```

## Coding Exercises

### 1. Implement Exponential Backoff
**Question**: Write a retry mechanism with jitter

**Answer**:
```python
import random
import time

def retry_with_backoff(
    func,
    max_retries=5,
    initial_delay=1,
    max_delay=30,
    jitter=True
):
    retries = 0
    delay = initial_delay
    
    while retries < max_retries:
        try:
            return func()
        except Exception as e:
            retries += 1
            if retries == max_retries:
                raise
            
            # Apply jitter (0.5 to 1.5 of delay)
            if jitter:
                actual_delay = delay * (0.5 + random.random())
            else:
                actual_delay = delay
                
            time.sleep(min(actual_delay, max_delay))
            delay *= 2  # Exponential backoff
```

### 2. Design a Metrics Aggregator
**Requirements**:
- Accepts data points from multiple services
- Calculates percentiles
- Handles 10,000 writes/second

**Solution**:
```markdown
**Architecture**:
1. **Ingestion Layer**:
   - Protocol: Prometheus remote_write
   - Scaling: Kafka topic partitioning

2. **Storage**:
   - Time-series DB: VictoriaMetrics cluster
   - Compression: Gorilla encoding

3. **Query Path**:
   ```go
   // Approximate percentile calculation
   func calculatePercentile(samples []float64, percentile float64) float64 {
       sort.Float64s(samples)
       rank := percentile * float64(len(samples)-1)
       lower := samples[int(rank)]
       upper := samples[int(rank)+1]
       return lower + (upper-lower)*(rank-float64(int(rank)))
   }
   ```

4. **Optimizations**:
   - Downsampling for historical data
   - Write-ahead logging for crash recovery
```

## Infrastructure as Code

### 1. Terraform Best Practices
**Question**: How would you structure Terraform for a multi-cloud deployment?

**Answer**:
```markdown
**Repository Layout**:
```
├── modules/
│   ├── network/
│   ├── compute/
│   └── database/
├── environments/
│   ├── aws/
│   │   ├── prod/
│   │   │   ├── main.tf -> ../../../modules/network
│   │   │   └── variables.tf
│   │   └── staging/
│   └── gcp/
│       └── prod/
└── scripts/
    └── validate.sh
```

**Key Practices**:
1. **State Management**:
   ```hcl
   terraform {
     backend "s3" {
       bucket = "tf-state-prod"
       key    = "network/terraform.tfstate"
       region = "us-west-2"
       dynamodb_table = "tf-lock-table"
     }
   }
   ```

2. **Policy Enforcement**:
   ```hcl
   # Sentinel policy example
   import "tfplan"
   
   main = rule {
     all tfplan.resources.aws_instance as _, instances {
       all instances as _, r {
         r.applied.tags contains "Environment"
       }
     }
   }
   ```
```

## Behavioral Questions

### 1. Conflict Resolution
**Question**: How would you handle pushback from developers on SLO changes?

**Answer**:
```markdown
**Approach**:
1. **Data-Driven Discussion**:
   - Show historical incident impact
   - Present cost/benefit analysis:
     ```
     | SLO Increase | Cost Estimate | Reduced Incidents/Yr |
     |--------------|---------------|----------------------|
     | 99.9% → 99.95% | $50k infra   | 12 → 6               |
     ```

2. **Collaborative Solution**:
   - Phase implementation
   - Offer reliability engineering support
   - Jointly monitor error budget consumption

3. **Compromise**:
   - Tiered SLOs (core vs. non-core endpoints)
   - Feature-specific budgets
```

### 2. Prioritization Framework
**Question**: How do you balance reliability work vs. feature development?

**Answer**:
```markdown
**Decision Matrix**:
1. **Quantify Impact**:
   - Calculate risk exposure: `(Downtime Cost) × (Failure Probability)`
   
2. **Error Budget Status**:
   - If budget >50% remaining: Feature work acceptable
   - If budget <10%: Mandatory reliability focus

3. **ROI Calculation**:
   ```
   Reliability Project: Reduce DB failover time from 5m → 1m
   - Expected savings: (4m × $10k/min outage) × 3 incidents/yr = $120k/yr
   - Cost: 2 engineer-months ($80k)
   - ROI: 150% in first year
   ```
```

## Performance Tuning

### 1. Linux System Optimization
**Question**: A server has high CPU usage but low application load. How to diagnose?

**Answer**:
```markdown
**Diagnosis Steps**:

1. **Process Analysis**:
   ```bash
   # Show CPU by process
   perf top -s cpu
   # Kernel call profiling
   perf record -ag -- sleep 10; perf report
   ```

2. **Context Switch Check**:
   ```bash
   vmstat 1
   # High cs? Check thread count:
   ps -eLf | wc -l
   ```

3. **CPU Specifics**:
   ```bash
   # Check for thermal throttling
   cat /proc/cpuinfo | grep -i "mhz"
   # Interrupts balance
   cat /proc/interrupts | sort -nr
   ```

4. **Common Culprits**:
   - IRQ imbalance (network interrupts on single core)
   - Memory pressure causing OOM kills
   - Noisy neighbor in cloud environments


### 2. Database Performance
**Question**: How would you troubleshoot slow PostgreSQL queries?

**Answer**:
```markdown
**Workflow**:

1. **Identify Problem Queries**:
   ```sql
   SELECT query, total_time, calls 
   FROM pg_stat_statements 
   ORDER BY total_time DESC LIMIT 10;
   ```

2. **Execution Plan Analysis**:
   ```sql
   EXPLAIN (ANALYZE, BUFFERS) 
   SELECT * FROM orders WHERE user_id = 123;
   ```

3. **Optimization Techniques**:
   - **Indexing**:
     ```sql
     CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id);
     ```
   - **Partitioning**:
     ```sql
     CREATE TABLE orders_2023 PARTITION OF orders
     FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
     ```
   - **Configuration**:
     ```ini
     # postgresql.conf
     shared_buffers = 8GB
     work_mem = 32MB
     ```
```