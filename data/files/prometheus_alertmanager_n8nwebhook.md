```markdown
# 🚨 Prometheus + Alertmanager + n8n Webhook Integration (Raspberry Pi Setup)

## 🧱 1. Install Prometheus on Raspberry Pi

```bash
cd ~
wget https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-armv7.tar.gz
tar -xzf prometheus-2.52.0.linux-armv7.tar.gz
cd prometheus-2.52.0.linux-armv7
./prometheus --config.file=/etc/prometheus/prometheus.yml
```

> ✅ Use `linux-armv7` or `linux-arm64` depending on your Pi model.

---

## 🧱 2. Install Alertmanager on Raspberry Pi

```bash
cd ~
wget https://github.com/prometheus/alertmanager/releases/download/v0.28.1/alertmanager-0.28.1.linux-armv7.tar.gz
tar -xzf alertmanager-0.28.1.linux-armv7.tar.gz
cd alertmanager-0.28.1.linux-armv7
./alertmanager --config.file=/etc/alertmanager/alertmanager.yml
```

---

## ⚙️ 3. Configure Alertmanager to Send Webhooks to n8n

Create `/etc/alertmanager/alertmanager.yml`:

```yaml
route:
  receiver: 'n8n-webhook'

receivers:
  - name: 'n8n-webhook'
    webhook_configs:
      - url: 'http://<n8n-ip>:5678/webhook/<your-webhook-id>'
        send_resolved: true
```

Restart Alertmanager after saving the config.

---

## 📈 4. Configure Prometheus to Scrape Metrics and Forward Alerts

Edit `/etc/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']

rule_files:
  - "/etc/prometheus/alert.rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

Restart Prometheus after editing.

---

## 📜 5. Create Alert Rules

Create `/etc/prometheus/alert.rules.yml`:

```yaml
groups:
  - name: system_alerts
    rules:
      - alert: HighCPUUsage
        expr: avg(rate(node_cpu_seconds_total{mode!="idle"}[1m])) > 0.0005
        for: 10s
        labels:
          severity: critical
        annotations:
          summary: "CPU usage is above 1%"
          description: "The average CPU usage over the last minute is above 80% on {{ $labels.instance }}"
```

> ✅ Lower threshold for testing. Restart Prometheus after saving.

---

## 🔍 6. Verify Alert Flow

- Prometheus UI: `http://<pi-ip>:9090/alerts`
- Alertmanager UI: `http://<pi-ip>:9093/#/alerts`
- n8n Webhook: Check execution history for incoming POST

---

## 🧠 7. Parse Alert in n8n

Use a `Webhook → Set → Function → Notification` flow:

- Extract fields like `alertname`, `severity`, `summary`, `description`
- Optionally use AI node to generate a human-friendly summary
- Send to Slack, Telegram, email, or trigger remediation

---

