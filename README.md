<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:020617,25:082f49,55:075985,80:0e7490,100:020617&height=260&section=header&text=SUDHAKAR%20REDDY&fontSize=58&fontColor=E0F7FF&fontAlignY=42&desc=SECURITY%20OPERATIONS%20%2F%2F%20BLUE%20TEAM&descSize=17&descColor=67E8F9&descAlignY=63&animation=twinkling" width="100%" alt="Animated blue SOC command-center banner" />

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=19&duration=1900&pause=550&color=67E8F9&center=true&vCenter=true&width=850&lines=%5BSYSTEM%5D+BOOTING+ANALYST+WORKSPACE...;%5BSOC%5D+MONITORING+%7C+TRIAGE+%7C+INVESTIGATION;%5BBLUE+TEAM%5D+DETECT.+VALIDATE.+RESPOND.;%5BSTATUS%5D+LEARNING+IN+PROGRESS_" alt="Animated SOC terminal status" />

<br/>

<img src="https://raw.githubusercontent.com/Sudhakar-reddy20/sudhakar-portfolio/main/photo.jpg" width="155" alt="Portrait of Onteddu Sudhakar Reddy" />

<br/>

<a href="https://sudhakar-reddy20.github.io/sudhakar-portfolio/"><img src="https://img.shields.io/badge/OPEN%20PORTFOLIO-00BFFF?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
<a href="https://www.linkedin.com/in/sudhakar-reddy1920"><img src="https://img.shields.io/badge/LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://github.com/Sudhakar-reddy20"><img src="https://img.shields.io/badge/GITHUB-111827?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>

<br/>

<img src="https://img.shields.io/badge/OPERATOR-SUDHAKAR-0B3954?style=flat-square" alt="Operator" />
<img src="https://img.shields.io/badge/FOCUS-SOC%20ANALYST-075985?style=flat-square" alt="Focus" />
<img src="https://img.shields.io/badge/MODE-BLUE%20TEAM-047857?style=flat-square" alt="Mode" />
<img src="https://komarev.com/ghpvc/?username=Sudhakar-reddy20&style=flat-square&color=0891B2&label=PROFILE+VIEWS" alt="Profile views" />

</div>

---

<table>
<tr>
<td width="58%" valign="top">

### <code>OPERATOR IDENTIFICATION</code>

**ONTEDDU SUDHAKAR REDDY**

Final-year B.Tech Computer Science & Engineering student focused on defensive security, practical SOC skills, log analysis, and detection engineering.

- **Mission:** SOC Analyst / Junior Security Analyst
- **Education:** B.Tech CSE · Expected 2027
- **Location:** Guntur, Andhra Pradesh, India
- **Approach:** Evidence first. Conclusions second.
- **Graduation:** 2027 · Open to internships and entry-level opportunities.

</td>
<td width="42%" valign="top">

### <code>CONSOLE STATUS</code>

```text
[ PROFILE ]   ONLINE
[ DOMAIN  ]   CYBERSECURITY
[ TEAM    ]   BLUE TEAM
[ FOCUS   ]   SOC OPERATIONS
[ MODE    ]   HANDS-ON LEARNING
[ ALERTS  ]   INVESTIGATE
```

</td>
</tr>
</table>

## <code>RECRUITER QUICK SCAN / 30-SECOND OVERVIEW</code>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=17&duration=2200&pause=650&color=67E8F9&center=true&vCenter=true&width=820&lines=I+TURN+SECURITY+EVENTS+INTO+INVESTIGABLE+SIGNALS.;PYTHON+AUTOMATION+%7C+LOG+ANALYSIS+%7C+BLUE+TEAM.;READY+TO+LEARN%2C+CONTRIBUTE+AND+GROW+IN+A+SOC." alt="Recruiter-focused animated introduction" />

<table>
<tr>
<td align="center" width="33%">

### DETECT

**Linux authentication**

Repeated failed logins and suspicious success-after-failure patterns.

</td>
<td align="center" width="33%">

### INVESTIGATE

**Windows telemetry**

Review Security Event XML, account activity and audit events.

</td>
<td align="center" width="33%">

### AUTOMATE

**Python tooling**

Build repeatable detection logic, tests and structured reports.

</td>
</tr>
</table>

<a href="https://sudhakar-reddy20.github.io/sudhakar-portfolio/"><img src="https://img.shields.io/badge/VIEW%20PROJECTS%20%26%20PORTFOLIO-0EA5E9?style=for-the-badge&logo=googlechrome&logoColor=white" alt="View portfolio and projects" /></a>
<a href="https://www.linkedin.com/in/sudhakar-reddy1920"><img src="https://img.shields.io/badge/LET'S%20CONNECT-059669?style=for-the-badge&logo=linkedin&logoColor=white" alt="Connect on LinkedIn" /></a>

<sub>INTERESTED IN ENTRY-LEVEL SOC ANALYST / JUNIOR SECURITY ANALYST OPPORTUNITIES</sub>

</div>

## <code>FEATURED SOC CASE FILE / THREATLENS</code>

<div align="center">

<img src="https://img.shields.io/badge/CASE-TL--2026--01-0B3954?style=for-the-badge&logo=shield&logoColor=white" alt="ThreatLens case file TL-2026-01" />
<img src="https://img.shields.io/badge/DATA-SYNTHETIC-075985?style=for-the-badge" alt="Synthetic training data" />
<img src="https://img.shields.io/badge/WORKFLOW-LOGS%20→%20DETECTION%20→%20EVIDENCE-047857?style=for-the-badge" alt="Log investigation workflow" />

</div>

**A practical investigation walkthrough from my ThreatLens project.** I built a Python CLI analyzer that parses Linux SSH authentication logs, applies configurable detection rules, preserves matching source lines, and exports JSON/CSV reports.

| Detection | Evidence in the training dataset | Analyst interpretation |
|:--|:--|:--|
| **TL-SSH-001 · HIGH** | Five failed SSH attempts from `192.0.2.50` targeting `admin` and `root` | Password-guessing pattern to validate |
| **TL-SSH-002 · CRITICAL** | Three failures followed by a successful password login from `198.51.100.25` for `testuser` | Promptly verify the account activity |

<details>
<summary><strong>Open the analyst's investigation workflow</strong></summary>

1. **Triage:** identify the source IP, targeted account names, timestamps, and matching events.
2. **Validate context:** check whether the source is an approved scanner, jump host, or known endpoint.
3. **Correlate:** review nearby authentication, endpoint, identity, and network activity.
4. **Preserve evidence:** retain original log lines and generated JSON/CSV reports.
5. **Reach a careful verdict:** suspicious authentication patterns are investigation leads—not proof of compromise.

**Reproduce the analysis:**

```bash
python -m pip install -e ".[dev]"
threatlens analyze sample_logs/auth.log --year 2026
```

The included dataset has 11 lines: 10 supported SSH authentication events and one unsupported connection-close event. It is synthetic and uses documentation-only IP ranges; it is not a real incident.

</details>

<div align="center">

<a href="https://github.com/Sudhakar-reddy20/threatlens"><img src="https://img.shields.io/badge/EXPLORE%20THREATLENS-0EA5E9?style=for-the-badge&logo=github&logoColor=white" alt="Explore ThreatLens source code" /></a>
<a href="https://github.com/Sudhakar-reddy20/threatlens/blob/main/docs/sample-investigation.md"><img src="https://img.shields.io/badge/READ%20FULL%20CASE%20STUDY-059669?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Read full case study" /></a>

</div>

---

## <code>01 / COMMAND CENTER</code>

<div align="center">

<img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=Sudhakar-reddy20&theme=github_dark" width="98%" alt="GitHub profile activity summary" />

<img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=Sudhakar-reddy20&theme=github_dark" height="165" alt="GitHub statistics" />
<img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=Sudhakar-reddy20&theme=github_dark" height="165" alt="Most used public repository languages" />

<img src="https://streak-stats.demolab.com?user=Sudhakar-reddy20&hide_border=true&background=050B18&ring=38BDF8&fire=34D399&currStreakLabel=38BDF8&sideLabels=DCEAF7&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=94A3B8" width="80%" alt="GitHub contribution streak" />

<img src="https://github-readme-activity-graph.vercel.app/graph?username=Sudhakar-reddy20&bg_color=050B18&color=38BDF8&line=34D399&point=FFFFFF&area=true&hide_border=true" width="98%" alt="GitHub contribution activity graph" />

</div>

## <code>02 / SECURITY PROJECTS</code>

<table>
<tr>
<td width="50%" valign="top">

### <a href="https://github.com/Sudhakar-reddy20/threatlens">THREATLENS</a>

<img src="https://img.shields.io/badge/PROJECT-LINUX%20LOG%20ANALYSIS-075985?style=flat-square" alt="Linux log analysis" />

**SSH Authentication Log Analyzer**

A Python CLI tool that analyzes Linux SSH authentication logs and highlights suspicious authentication patterns.

- Repeated failed-login detection
- Success-after-failure correlation
- Source IP and username context
- JSON and CSV investigation reports
- Automated tests for detection logic

**Stack:** Python · Linux · Detection Engineering

</td>
<td width="50%" valign="top">

### <a href="https://github.com/Sudhakar-reddy20/threatlens/tree/main/projects/windows-event-log-analyzer">WINDOWS EVENT LOG ANALYZER</a>

<img src="https://img.shields.io/badge/PROJECT-WINDOWS%20EVENTS-075985?style=flat-square" alt="Windows event analysis" />

**Windows Security Event Investigation**

A defensive utility for reviewing exported Windows Security Event XML and identifying activity that may need investigation.

- Failed and successful logon analysis
- Account and group-change events
- Audit-log clearing indicators
- JSON and CSV reporting
- Synthetic dataset and unit tests

**Stack:** Python · Windows Events · XML

</td>
</tr>
</table>

## <code>03 / EXPERIENCE & PROFESSIONAL DEVELOPMENT</code>

| EXPERIENCE | DETAILS |
|:--|:--|
| **Datavalley** | IoT internship |
| **ExcelR** | Full Stack Java / MERN internship |

*Internship titles, dates, and project outcomes can be added once verified; no unconfirmed responsibilities are claimed here.*

### TRAINING & HANDS-ON LABS

- **TryHackMe:** Search Skills · Defensive Security Intro · Offensive Security Intro
- **Hackversity:** 100+ hands-on labs completed, as reported by me

*These are listed as training and lab practice, not as professional certifications.*

## <code>04 / DETECTION & INVESTIGATION CAPABILITIES</code>

| SECURITY AREA | HANDS-ON FOCUS |
|:--|:--|
| **SOC workflow** | Alert triage, event review, investigation notes, escalation thinking |
| **Authentication analysis** | Failed logons, success-after-failure patterns, source context |
| **Windows telemetry** | Security Event XML, account changes, audit events |
| **Detection engineering** | Python rules, thresholds, event correlation, test cases |
| **Network fundamentals** | TCP/IP, DNS, HTTP/HTTPS, Wireshark, Nmap |
| **Security assessment** | Web and infrastructure assessment in authorized labs |
| **Automation** | Python and Bash scripts for repeatable analysis |

> **INVESTIGATION PRINCIPLE**  
> An alert is a lead, not a verdict. Establish a timeline, correlate relevant events, validate evidence, and record what the data actually supports.

## <code>05 / TOOL ARSENAL</code>

<div align="center">

<img src="https://skillicons.dev/icons?i=python,bash,linux,kali,windows,git,github,vscode&theme=dark" alt="Python, Bash, Linux, Kali Linux, Windows, Git, GitHub and VS Code" />

<br/><br/>

<img src="https://img.shields.io/badge/WIRESHARK-1679A7?style=for-the-badge&logo=wireshark&logoColor=white" alt="Wireshark" />
<img src="https://img.shields.io/badge/NMAP-2E6E9E?style=for-the-badge&logo=linux&logoColor=white" alt="Nmap" />
<img src="https://img.shields.io/badge/BURP%20SUITE-FF6633?style=for-the-badge&logo=burpsuite&logoColor=white" alt="Burp Suite" />
<img src="https://img.shields.io/badge/METASPLOIT-2596CD?style=for-the-badge&logo=metasploit&logoColor=white" alt="Metasploit" />

</div>

*Tools shown reflect my learning and project experience; I continue to build depth through practice.*

## <code>06 / TRAINING ENVIRONMENT</code>

```text
POCKET SOC LAB
|
+-- Sample Linux authentication logs
+-- Python failed-login detection
+-- Failure-to-success correlation
+-- Investigation notes and evidence
+-- Repeatable local practice on macOS

LEARNING TRACK
|
+-- Linux & Windows fundamentals
+-- TCP/IP, DNS & HTTP/S
+-- Defensive security & alert triage
+-- Controlled security labs
+-- Technical reporting
```

## <code>07 / CURRENT MISSION</code>

**Target:** SOC Analyst / Junior Security Analyst

**Availability:** Open to internships and entry-level opportunities.

**Building depth in:** Windows event investigation · Network traffic analysis · Alert triage · Detection logic · Incident documentation.

I welcome opportunities to learn from security professionals, collaborate on practical projects, and contribute to a defensive-security team.

## <code>08 / CONTACT</code>

- **Email:** [Sudhakar1558796@gmail.com](mailto:Sudhakar1558796@gmail.com)
- **LinkedIn:** [linkedin.com/in/sudhakar-reddy1920](https://www.linkedin.com/in/sudhakar-reddy1920)
- **Portfolio:** [sudhakar-reddy20.github.io/sudhakar-portfolio](https://sudhakar-reddy20.github.io/sudhakar-portfolio/)

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2100&pause=700&color=34D399&center=true&vCenter=true&width=780&lines=%5BSESSION+END%5D+STAY+CURIOUS.;%5BBLUE+TEAM%5D+DETECT.+INVESTIGATE.+IMPROVE.;%5BSYSTEM%5D+CONTINUOUS+LEARNING..." alt="Animated closing terminal" />

<a href="https://sudhakar-reddy20.github.io/sudhakar-portfolio/"><img src="https://img.shields.io/badge/EXPLORE%20MY%20PORTFOLIO-00BFFF?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Explore portfolio" /></a>
<a href="https://www.linkedin.com/in/sudhakar-reddy1920"><img src="https://img.shields.io/badge/CONNECT%20ON%20LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="Connect on LinkedIn" /></a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:020617,45:075985,75:0e7490,100:020617&height=150&section=footer&animation=twinkling" width="100%" alt="Animated command-center footer" />

<sub>ONTEDDU SUDHAKAR REDDY · SECURITY OPERATIONS · EVIDENCE-BASED INVESTIGATION</sub>

</div>
