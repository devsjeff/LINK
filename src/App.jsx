import { useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0e17",
  surface: "#111827",
  card: "#1a2235",
  border: "#2a3a55",
  text: "#e2e8f0",
  muted: "#64748b",
  playwright: "#2dd4bf",   // teal
  boto3: "#f59e0b",        // amber
  python: "#3b82f6",       // blue
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a78bfa",
};

// ─── Quick Review Content ─────────────────────────────────────────────────────
const quickReviewMD = `# 🐍 Python · Playwright · AWS Boto3 — Quick Review
> Basic → Advanced. Read in ~12 min.

---

## 🟢 PYTHON BASICS (1–8)

### 1. Variables & Data Types
- Python is dynamically typed — no need to declare types.
- Core types: int, float, str, bool, list, tuple, dict, set, None.
- \`type(x)\` to check. f-strings for formatting: \`f"Hello {name}"\`.

### 2. Control Flow
- if / elif / else, for loops, while loops.
- \`break\` exits loop, \`continue\` skips iteration, \`pass\` is a no-op.
- Comprehensions: \`[x*2 for x in range(10) if x % 2 == 0]\`

### 3. Functions
- \`def func(arg, *args, **kwargs):\` — positional, variadic, keyword args.
- Default values: \`def greet(name="World"):\`
- Lambda: \`add = lambda a, b: a + b\`
- Decorators: \`@decorator\` above a function.

### 4. OOP
- \`class Dog:\` → \`__init__\`, instance methods take \`self\`.
- Inheritance: \`class Labrador(Dog):\`, call parent with \`super()\`.
- Dunder methods: \`__str__\`, \`__repr__\`, \`__len__\`, \`__eq__\`.

### 5. Error Handling
- \`try / except / else / finally\` blocks.
- Raise: \`raise ValueError("bad input")\`
- Custom exceptions: subclass Exception.

### 6. File I/O
- \`with open("file.txt", "r") as f: data = f.read()\`
- Modes: r, w, a, rb, wb. Always use \`with\` to auto-close.

### 7. Modules & Packages
- \`import os\`, \`from pathlib import Path\`, \`import json\`.
- Create packages with \`__init__.py\`.
- Virtual envs: \`python -m venv venv && source venv/bin/activate\`.

### 8. List/Dict Comprehensions & Generators
- List: \`[f(x) for x in items if cond]\`
- Dict: \`{k: v for k, v in pairs}\`
- Generator: \`(x**2 for x in range(1000))\` — lazy, memory-efficient.

---

## 🟡 PLAYWRIGHT (9–18)

### 9. What is Playwright?
- Microsoft's browser automation library. Supports Chromium, Firefox, WebKit.
- Sync and Async APIs. Best practice: use async with \`asyncio\`.
- Install: \`pip install playwright && playwright install\`

### 10. First Script
- \`async with async_playwright() as p:\` → \`browser = await p.chromium.launch()\`
- \`page = await browser.new_page()\` → \`await page.goto(url)\`
- \`await browser.close()\`

### 11. Selectors
- CSS: \`page.locator("button.submit")\`
- Text: \`page.get_by_text("Login")\`
- Role: \`page.get_by_role("button", name="Submit")\`
- Test ID: \`page.get_by_test_id("login-btn")\`

### 12. Actions
- Click: \`await locator.click()\`
- Type: \`await locator.fill("text")\`
- Select: \`await locator.select_option("value")\`
- Hover, press, drag-drop all supported.

### 13. Assertions (expect)
- \`await expect(locator).to_be_visible()\`
- \`await expect(page).to_have_url("...")\`
- \`await expect(locator).to_have_text("...")\`
- Auto-retry until timeout. No manual waits needed.

### 14. Waiting & Timeouts
- Playwright auto-waits for elements — don't use sleep().
- \`await page.wait_for_load_state("networkidle")\`
- \`await page.wait_for_selector(".spinner", state="hidden")\`
- Set timeout: \`page.set_default_timeout(30000)\`

### 15. Screenshots & Videos
- Screenshot: \`await page.screenshot(path="shot.png", full_page=True)\`
- Record video: \`context = await browser.new_context(record_video_dir="videos/")\`
- Trace: \`await context.tracing.start(screenshots=True)\`

### 16. Network Interception
- \`await page.route("**/api/**", handle_route)\`
- Mock responses: \`await route.fulfill(status=200, body=json_str)\`
- Abort requests: \`await route.abort()\`
- Listen: \`page.on("request", lambda r: print(r.url))\`

### 17. pytest-playwright
- \`pip install pytest-playwright\`
- Fixtures: \`page\`, \`browser\`, \`context\` auto-injected.
- \`@pytest.mark.parametrize\` for data-driven tests.
- \`playwright test --headed --slowmo 500\` for debugging.

### 18. Page Object Model (POM)
- Class per page: \`class LoginPage:\` with locators as properties.
- Methods: \`async def login(self, user, pw):\`
- Separates test logic from UI details — maintainable at scale.

---

## 🔴 AWS BOTO3 (19–30)

### 19. What is Boto3?
- Official AWS SDK for Python. Talks to every AWS service via API.
- Install: \`pip install boto3\`
- Auth: IAM credentials via \`~/.aws/credentials\` or env vars or IAM roles.

### 20. Clients vs Resources
- **Client** — low-level, 1:1 with AWS API. Returns raw dicts.
  \`s3 = boto3.client("s3")\`
- **Resource** — higher-level, OOP. More Pythonic.
  \`s3 = boto3.resource("s3")\`

### 21. S3 — Buckets & Objects
- Create bucket: \`s3.create_bucket(Bucket="my-bucket")\`
- Upload: \`s3.upload_file("local.txt", "bucket", "key.txt")\`
- Download: \`s3.download_file("bucket", "key.txt", "local.txt")\`
- List: \`s3.list_objects_v2(Bucket="bucket")["Contents"]\`

### 22. S3 — Presigned URLs
- Share private objects temporarily without exposing credentials.
- \`url = s3.generate_presigned_url("get_object", Params={...}, ExpiresIn=3600)\`
- Used for direct browser uploads/downloads.

### 23. DynamoDB
- NoSQL key-value + document DB. No schema except PK.
- Put: \`table.put_item(Item={"pk": "u1", "name": "Dev"})\`
- Get: \`table.get_item(Key={"pk": "u1"})\`
- Query (same PK): \`table.query(KeyConditionExpression=Key("pk").eq("u1"))\`
- Scan (whole table — expensive): \`table.scan(FilterExpression=Attr("age").gt(18))\`

### 24. Lambda
- Serverless functions. Triggered by events (S3, API Gateway, SQS…).
- Deploy: zip code + \`lambda.update_function_code(ZipFile=bytes)\`
- Invoke: \`lambda.invoke(FunctionName="fn", Payload=json_bytes)\`
- Response in \`response["Payload"].read()\`

### 25. IAM — Users, Roles, Policies
- Least privilege: give only permissions needed.
- Roles: assumed by services/EC2 — no long-term credentials.
- Policies: JSON documents. Managed vs inline.
- Check permissions: \`iam.simulate_principal_policy()\`

### 26. SQS — Message Queues
- Decouple producers and consumers.
- Send: \`sqs.send_message(QueueUrl=url, MessageBody="hello")\`
- Receive: \`sqs.receive_message(QueueUrl=url, MaxNumberOfMessages=10)\`
- Delete after processing: \`sqs.delete_message(QueueUrl=url, ReceiptHandle=handle)\`

### 27. SNS — Pub/Sub Notifications
- Fan-out messages to multiple subscribers (email, SQS, Lambda, HTTP).
- Publish: \`sns.publish(TopicArn=arn, Message="text", Subject="subj")\`
- Subscribe: \`sns.subscribe(TopicArn=arn, Protocol="email", Endpoint="a@b.com")\`

### 28. EC2 — Virtual Machines
- Launch: \`ec2.run_instances(ImageId="ami-...", InstanceType="t3.micro", MinCount=1, MaxCount=1)\`
- List: \`ec2.describe_instances()["Reservations"]\`
- Stop/Start/Terminate by InstanceId.
- Use key pairs for SSH, security groups for firewall rules.

### 29. Boto3 Paginators & Waiters
- Paginator: handles large result sets automatically.
  \`paginator = s3.get_paginator("list_objects_v2")\`
  \`for page in paginator.paginate(Bucket="b"): ...\`
- Waiter: polls until resource is in a desired state.
  \`waiter = ec2.get_waiter("instance_running")\`
  \`waiter.wait(InstanceIds=["i-123"])\`

### 30. Best Practices
- Use IAM roles over hardcoded keys — NEVER commit credentials.
- Use \`botocore.exceptions.ClientError\` for error handling.
- Session per thread: \`boto3.Session()\` for thread safety.
- Enable retries: \`config = Config(retries={"max_attempts": 5, "mode": "adaptive"})\`
- Use SSM Parameter Store / Secrets Manager for secrets.
`;

// ─── Playwright Topics ────────────────────────────────────────────────────────
const playwrightTopics = [
  {
    id: 1, emoji: "🎭", title: "Installation & Setup",
    color: T.playwright,
    theory: [
      "Playwright is Microsoft's end-to-end browser automation framework for Python.",
      "It controls real browsers (Chromium, Firefox, WebKit) via the DevTools Protocol.",
      "Supports both synchronous and asynchronous APIs — async is preferred for performance.",
      "A single API works across all major browsers with zero configuration changes.",
    ],
    notes: [
      "pip install playwright then playwright install to download browser binaries.",
      "playwright install chromium installs only Chromium, saving disk space.",
      "Use async_playwright() for async code (recommended) or sync_playwright() for scripts.",
      "Headless by default — set headless=False during development to watch the browser.",
    ],
    code: `# Install
# pip install playwright
# playwright install

from playwright.async_api import async_playwright
import asyncio

async def main():
    async with async_playwright() as p:
        # Launch browser (headless=False to watch it)
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        await page.goto("https://example.com")
        print(await page.title())
        
        await browser.close()

asyncio.run(main())`,
  },
  {
    id: 2, emoji: "🔍", title: "Selectors & Locators",
    color: T.playwright,
    theory: [
      "Locators represent a way to find elements on a page and take actions on them.",
      "Playwright's locators are auto-retrying — they wait for the element to appear before acting.",
      "Prefer user-facing selectors (role, text, label) over CSS/XPath — they're more resilient.",
      "Locators can be chained to narrow down: page.locator('.list').locator('.item')",
    ],
    notes: [
      "get_by_role() is the most preferred — mirrors how users and assistive tech see the page.",
      "get_by_test_id() requires data-testid attributes — good for stable automated tests.",
      "Avoid XPath when possible — brittle against small HTML changes.",
      "locator.nth(0) to pick the first of multiple matches.",
    ],
    code: `# Different ways to find elements
page = await browser.new_page()
await page.goto("https://myapp.com")

# By role (PREFERRED — semantic and robust)
btn = page.get_by_role("button", name="Submit")

# By visible text
link = page.get_by_text("Sign In")

# By label text (for inputs)
email_input = page.get_by_label("Email address")

# By placeholder
search = page.get_by_placeholder("Search...")

# By CSS selector
card = page.locator(".product-card")

# By test ID (add data-testid="login-btn" in your HTML)
login = page.get_by_test_id("login-btn")

# Chaining — narrow down
first_item = page.locator("ul.menu").get_by_role("listitem").first`,
  },
  {
    id: 3, emoji: "🖱️", title: "Actions — Click, Fill, Select",
    color: T.playwright,
    theory: [
      "Actions interact with elements — click, fill, select, hover, drag, upload.",
      "All actions auto-wait for the element to be actionable (visible, enabled, stable).",
      "fill() replaces the value completely. type() simulates real keystrokes.",
      "Playwright dispatches real browser events, not synthetic JS events.",
    ],
    notes: [
      "Use fill() for inputs — it's faster. Use type() when you need keystroke simulation.",
      "click() with button='right' for context menus. dblclick() for double-click.",
      "select_option() works on <select> elements by value, label, or index.",
      "Keyboard: page.keyboard.press('Enter'), page.keyboard.type('hello').",
    ],
    code: `# Common actions
await page.get_by_label("Username").fill("devendra")
await page.get_by_label("Password").fill("secret123")

# Click submit button
await page.get_by_role("button", name="Login").click()

# Select from dropdown
await page.get_by_label("Country").select_option("India")

# Check a checkbox
await page.get_by_label("Remember me").check()

# Upload file
await page.get_by_label("Upload").set_input_files("report.pdf")

# Hover (for dropdown menus)
await page.get_by_text("Products").hover()

# Press keyboard
await page.get_by_role("searchbox").press("Enter")

# Drag and drop
await page.locator("#source").drag_to(page.locator("#target"))`,
  },
  {
    id: 4, emoji: "✅", title: "Assertions with expect()",
    color: T.playwright,
    theory: [
      "expect() provides web-first assertions that auto-retry until they pass or timeout.",
      "Unlike plain assert, expect() waits — no need for manual sleep() or waiting.",
      "Assertions check visibility, text, URL, count, attribute, CSS state, and more.",
      "Use soft assertions (expect.soft) to continue test after a failure.",
    ],
    notes: [
      "to_be_visible() waits for the element to appear in the viewport.",
      "to_have_text() matches exact text or regex. to_contain_text() for partial.",
      "to_have_url() checks the current page URL — great after navigation.",
      "Timeout defaults to 5s. Override: expect(locator, timeout=10000).",
    ],
    code: `from playwright.async_api import expect

# Visibility
await expect(page.get_by_text("Welcome")).to_be_visible()
await expect(page.locator(".spinner")).to_be_hidden()

# Text content
await expect(page.locator("h1")).to_have_text("Dashboard")
await expect(page.locator(".status")).to_contain_text("Active")

# URL check after navigation
await page.get_by_role("button", name="Go to profile").click()
await expect(page).to_have_url("/profile")

# Input value
await expect(page.get_by_label("Email")).to_have_value("user@example.com")

# Count — exactly 3 items
await expect(page.locator(".card")).to_have_count(3)

# Attribute
await expect(page.locator("img")).to_have_attribute("alt", "Logo")

# Checkbox state
await expect(page.get_by_label("Terms")).to_be_checked()`,
  },
  {
    id: 5, emoji: "🕸️", title: "Network Interception",
    color: T.playwright,
    theory: [
      "Playwright can intercept, modify, block, or mock any network request.",
      "Use page.route() to register a handler for URLs matching a pattern.",
      "Mocking APIs lets you test edge cases (errors, slow responses) without a real backend.",
      "Network events (request, response, requestfailed) let you observe traffic.",
    ],
    notes: [
      "route.fulfill() returns a fake response. route.abort() blocks the request.",
      "route.continue_() passes the request through unchanged.",
      "Glob patterns: '**/api/users**', exact URLs, or regex.",
      "page.expect_request() and page.expect_response() for awaiting specific traffic.",
    ],
    code: `# Mock an API endpoint
async def mock_users(route):
    await route.fulfill(
        status=200,
        content_type="application/json",
        body='[{"id": 1, "name": "Dev"}]'
    )

await page.route("**/api/users", mock_users)
await page.goto("/dashboard")  # hits mocked API

# Block all image requests (speed up tests)
await page.route("**/*.{png,jpg,jpeg,gif}", lambda r: r.abort())

# Simulate API error
await page.route("**/api/data", lambda r: r.fulfill(status=500))

# Intercept and modify request headers
async def add_auth(route, request):
    headers = {**request.headers, "Authorization": "Bearer token"}
    await route.continue_(headers=headers)

await page.route("**/api/**", add_auth)

# Listen to all requests
page.on("request", lambda req: print("→", req.url))
page.on("response", lambda res: print("←", res.status, res.url))`,
  },
  {
    id: 6, emoji: "📸", title: "Screenshots, Videos & Tracing",
    color: T.playwright,
    theory: [
      "Playwright can capture screenshots and record videos of test runs automatically.",
      "Trace Viewer is a timeline of every action, screenshot, network request, and console log.",
      "These tools are invaluable for debugging CI failures where you can't watch the browser.",
      "Traces can be viewed at trace.playwright.dev by dropping the trace.zip file.",
    ],
    notes: [
      "full_page=True in screenshot captures the entire scrollable page.",
      "Videos are recorded per browser context — set record_video_dir on new_context().",
      "tracing.start(screenshots=True, snapshots=True) gives the richest trace.",
      "On failure in pytest-playwright, traces are saved automatically.",
    ],
    code: `# Screenshot
await page.screenshot(path="homepage.png")
await page.screenshot(path="full-page.png", full_page=True)

# Clip a specific area
await page.screenshot(path="clip.png", clip={"x":0,"y":0,"width":300,"height":200})

# Element screenshot
await page.locator(".chart").screenshot(path="chart.png")

# Record video
context = await browser.new_context(record_video_dir="videos/")
page = await context.new_page()
# ... run your test ...
await context.close()  # video saved here

# Playwright Trace (best for debugging)
await context.tracing.start(screenshots=True, snapshots=True)
# ... run test ...
await context.tracing.stop(path="trace.zip")
# View: playwright show-trace trace.zip`,
  },
  {
    id: 7, emoji: "🧪", title: "pytest-playwright",
    color: T.playwright,
    theory: [
      "pytest-playwright integrates Playwright into pytest with auto-managed fixtures.",
      "The page fixture provides a fresh page per test. browser and context are also available.",
      "Parallel execution is supported via pytest-xdist — run tests across multiple workers.",
      "Configuration lives in pytest.ini or pyproject.toml.",
    ],
    notes: [
      "pip install pytest-playwright — no need to manage browser lifecycle yourself.",
      "pytest --headed runs tests with visible browsers for debugging.",
      "pytest --slowmo 500 slows each action by 500ms so you can follow along.",
      "Use @pytest.fixture(scope='session') for browser to reuse across tests.",
    ],
    code: `# test_login.py
import pytest
from playwright.sync_api import expect

def test_successful_login(page):
    page.goto("https://myapp.com/login")
    page.get_by_label("Email").fill("user@test.com")
    page.get_by_label("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    
    expect(page).to_have_url("/dashboard")
    expect(page.get_by_text("Welcome")).to_be_visible()

# Parameterized test
@pytest.mark.parametrize("browser_name", ["chromium", "firefox", "webkit"])
def test_cross_browser(browser_name, browser_type):
    browser = browser_type.launch()
    page = browser.new_page()
    page.goto("https://myapp.com")
    expect(page).to_have_title("My App")
    browser.close()

# conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {**browser_context_args, "viewport": {"width": 1280, "height": 720}}`,
  },
  {
    id: 8, emoji: "🏗️", title: "Page Object Model (POM)",
    color: T.playwright,
    theory: [
      "POM is a design pattern where each page of your app is represented as a Python class.",
      "Locators and actions are encapsulated inside the class — tests just call methods.",
      "When the UI changes, you update one class instead of every test that touches that page.",
      "POM makes tests readable: test_login calls page.login(user, pw) — intent is clear.",
    ],
    notes: [
      "Keep locators as @property methods or class variables.",
      "Action methods should combine multiple steps into meaningful operations.",
      "Return the next page object from navigation methods for method chaining.",
      "Store the page fixture as self.page in __init__.",
    ],
    code: `# pages/login_page.py
class LoginPage:
    def __init__(self, page):
        self.page = page
        self.email_input = page.get_by_label("Email")
        self.password_input = page.get_by_label("Password")
        self.submit_btn = page.get_by_role("button", name="Login")
        self.error_msg = page.locator(".error-message")

    async def navigate(self):
        await self.page.goto("/login")
        return self

    async def login(self, email: str, password: str):
        await self.email_input.fill(email)
        await self.password_input.fill(password)
        await self.submit_btn.click()
        return DashboardPage(self.page)  # return next page

# tests/test_auth.py
async def test_login(page):
    login = LoginPage(page)
    await login.navigate()
    dashboard = await login.login("dev@test.com", "pass123")
    await expect(dashboard.welcome_text).to_be_visible()`,
  },
  {
    id: 9, emoji: "⚡", title: "Advanced: CDP & Mobile",
    color: T.playwright,
    theory: [
      "Playwright exposes the Chrome DevTools Protocol (CDP) for deep browser control.",
      "Emulate mobile devices with device descriptors — viewport, user-agent, touch events.",
      "Geolocation, permissions, timezone, and locale can all be mocked per context.",
      "Accessibility snapshot lets you inspect the accessibility tree programmatically.",
    ],
    notes: [
      "devices dictionary includes iPhone, Pixel, iPad presets.",
      "Grant permissions: context.grant_permissions(['geolocation']).",
      "CDP session: client = await page.context.new_cdp_session(page).",
      "page.accessibility.snapshot() returns the full accessibility tree as JSON.",
    ],
    code: `from playwright.async_api import async_playwright

async def mobile_test():
    async with async_playwright() as p:
        # Emulate iPhone 14
        iphone = p.devices["iPhone 14"]
        browser = await p.webkit.launch()
        context = await browser.new_context(
            **iphone,
            locale="en-IN",
            timezone_id="Asia/Kolkata",
            geolocation={"latitude": 23.25, "longitude": 77.40},
            permissions=["geolocation"],
        )
        page = await context.new_page()
        await page.goto("https://maps.google.com")
        await page.screenshot(path="mobile.png")

        # CDP — disable JavaScript
        client = await context.new_cdp_session(page)
        await client.send("Emulation.setScriptExecutionDisabled", {"value": True})
        
        await browser.close()`,
  },
];

// ─── Boto3 Topics ─────────────────────────────────────────────────────────────
const boto3Topics = [
  {
    id: 1, emoji: "☁️", title: "Setup & Authentication",
    color: T.boto3,
    theory: [
      "Boto3 is AWS's official Python SDK. It wraps the AWS REST APIs into Pythonic interfaces.",
      "Authentication: IAM credentials read from env vars, ~/.aws/credentials, or IAM roles (on EC2/Lambda).",
      "Never hardcode credentials. Use IAM roles for production workloads.",
      "Sessions allow you to maintain isolated credential sets and configs per thread.",
    ],
    notes: [
      "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION as env vars.",
      "aws configure CLI command writes to ~/.aws/credentials automatically.",
      "IAM roles are the most secure option — attached to EC2, Lambda, ECS, etc.",
      "boto3.Session() is thread-safe. Use one session per thread.",
    ],
    code: `import boto3
from botocore.config import Config

# Basic client (uses default credentials)
s3 = boto3.client("s3", region_name="ap-south-1")

# Session (explicit credentials — for multi-account)
session = boto3.Session(
    aws_access_key_id="AKIA...",       # Don't hardcode in prod!
    aws_secret_access_key="secret...",
    region_name="ap-south-1",
)
s3 = session.client("s3")

# Config — retries + timeouts
config = Config(
    retries={"max_attempts": 5, "mode": "adaptive"},
    connect_timeout=5,
    read_timeout=30,
)
s3 = boto3.client("s3", config=config)

# Assume a Role (cross-account access)
sts = boto3.client("sts")
creds = sts.assume_role(
    RoleArn="arn:aws:iam::123456789:role/MyRole",
    RoleSessionName="my-session",
)["Credentials"]
cross_s3 = boto3.client("s3",
    aws_access_key_id=creds["AccessKeyId"],
    aws_secret_access_key=creds["SecretAccessKey"],
    aws_session_token=creds["SessionToken"],
)`,
  },
  {
    id: 2, emoji: "🪣", title: "S3 — Storage",
    color: T.boto3,
    theory: [
      "S3 (Simple Storage Service) stores objects (files) in buckets. Virtually unlimited storage.",
      "Objects have a key (path-like string), body, and metadata. No real folders — keys with / just look like folders.",
      "Access control: bucket policies, ACLs, and presigned URLs for temporary access.",
      "S3 is used for: static websites, data lakes, backups, media storage, ML datasets.",
    ],
    notes: [
      "Bucket names are globally unique across all AWS accounts.",
      "Objects can be up to 5TB. Use multipart upload for >100MB files.",
      "Versioning: enable on bucket to keep all versions of objects.",
      "Lifecycle rules: auto-move to cheaper storage (Glacier) or delete after N days.",
    ],
    code: `import boto3
from botocore.exceptions import ClientError

s3 = boto3.client("s3", region_name="ap-south-1")

# Create bucket
s3.create_bucket(
    Bucket="my-app-bucket-2024",
    CreateBucketConfiguration={"LocationConstraint": "ap-south-1"},
)

# Upload file
s3.upload_file("local_report.pdf", "my-app-bucket-2024", "reports/report.pdf")

# Upload from memory
import io, json
data = json.dumps({"key": "value"}).encode()
s3.put_object(Bucket="my-app-bucket-2024", Key="data.json", Body=data)

# Download
s3.download_file("my-app-bucket-2024", "reports/report.pdf", "downloaded.pdf")

# List objects
resp = s3.list_objects_v2(Bucket="my-app-bucket-2024", Prefix="reports/")
for obj in resp.get("Contents", []):
    print(obj["Key"], obj["Size"])

# Delete
s3.delete_object(Bucket="my-app-bucket-2024", Key="reports/report.pdf")

# Presigned URL (valid for 1 hour)
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-app-bucket-2024", "Key": "reports/report.pdf"},
    ExpiresIn=3600,
)`,
  },
  {
    id: 3, emoji: "🗄️", title: "DynamoDB — NoSQL Database",
    color: T.boto3,
    theory: [
      "DynamoDB is AWS's fully managed NoSQL database — key-value + document model.",
      "Schema-free except for the primary key (partition key + optional sort key).",
      "Single-digit millisecond latency at any scale. Pay per request or provisioned capacity.",
      "GSI (Global Secondary Index) lets you query on non-key attributes.",
    ],
    notes: [
      "Partition key should have high cardinality to avoid hot partitions.",
      "Query (uses index — fast) vs Scan (reads all items — expensive, avoid in prod).",
      "Condition expressions prevent overwriting: condition_expression='attribute_not_exists(pk)'.",
      "DynamoDB Streams trigger Lambda on item changes — event-driven architecture.",
    ],
    code: `import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource("dynamodb", region_name="ap-south-1")
table = dynamodb.Table("Users")

# Put item
table.put_item(Item={
    "userId": "u123",
    "email": "dev@example.com",
    "age": 25,
    "skills": ["python", "aws"],
    "active": True,
})

# Get item (exact key lookup — O(1))
resp = table.get_item(Key={"userId": "u123"})
user = resp.get("Item")

# Update item
table.update_item(
    Key={"userId": "u123"},
    UpdateExpression="SET age = :a, #st = :s",
    ExpressionAttributeValues={":a": 26, ":s": "senior"},
    ExpressionAttributeNames={"#st": "status"},
)

# Query (same partition key)
resp = table.query(KeyConditionExpression=Key("userId").eq("u123"))

# Scan with filter (use sparingly!)
resp = table.scan(FilterExpression=Attr("age").gt(18) & Attr("active").eq(True))

# Delete
table.delete_item(Key={"userId": "u123"})`,
  },
  {
    id: 4, emoji: "λ", title: "Lambda — Serverless Functions",
    color: T.boto3,
    theory: [
      "Lambda runs code without managing servers. You pay only for execution time.",
      "Triggered by 200+ AWS events: S3 uploads, DynamoDB streams, API Gateway, SQS, SNS.",
      "Deploy as a .zip or container image. Runtime: Python 3.12 supported.",
      "Max 15 min execution, 10GB memory, 10GB ephemeral /tmp storage.",
    ],
    notes: [
      "Lambda handler: def handler(event, context): — event is the trigger data.",
      "Environment variables for config. Secrets Manager for sensitive values.",
      "Layers: share common code (libraries) across functions without bundling them.",
      "Concurrency: Lambda auto-scales. Use reserved concurrency to control limits.",
    ],
    code: `import boto3, json, zipfile, io

lam = boto3.client("lambda", region_name="ap-south-1")

# Create function (zip your handler.py)
with open("handler.py", "rb") as f:
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w") as z:
        z.writestr("handler.py", f.read())
    zip_bytes = zip_buffer.getvalue()

lam.create_function(
    FunctionName="my-processor",
    Runtime="python3.12",
    Role="arn:aws:iam::123456:role/lambda-exec-role",
    Handler="handler.handler",
    Code={"ZipFile": zip_bytes},
    Timeout=30,
    MemorySize=256,
    Environment={"Variables": {"TABLE_NAME": "Users"}},
)

# Invoke synchronously
resp = lam.invoke(
    FunctionName="my-processor",
    InvocationType="RequestResponse",  # or "Event" for async
    Payload=json.dumps({"userId": "u123"}).encode(),
)
result = json.loads(resp["Payload"].read())
print(result)

# Update code
lam.update_function_code(FunctionName="my-processor", ZipFile=zip_bytes)`,
  },
  {
    id: 5, emoji: "📬", title: "SQS & SNS — Messaging",
    color: T.boto3,
    theory: [
      "SQS (Simple Queue Service): durable point-to-point message queue. Decouples producers and consumers.",
      "SNS (Simple Notification Service): pub/sub fan-out. One message → many subscribers (SQS, Lambda, email, HTTP).",
      "SQS visibility timeout: message hidden from other consumers while being processed.",
      "Dead Letter Queue (DLQ): messages that fail processing N times go here for analysis.",
    ],
    notes: [
      "Standard queue: at-least-once delivery, best-effort ordering. FIFO: exactly-once, ordered.",
      "Max message size: 256KB. Use S3 + SQS for larger payloads.",
      "Long polling (WaitTimeSeconds=20) reduces empty responses and cost.",
      "Always delete the message after successful processing — or it reappears.",
    ],
    code: `import boto3, json

sqs = boto3.client("sqs", region_name="ap-south-1")
sns = boto3.client("sns", region_name="ap-south-1")

# SQS — create queue
resp = sqs.create_queue(QueueName="orders.fifo",
    Attributes={"FifoQueue": "true", "ContentBasedDeduplication": "true"})
queue_url = resp["QueueUrl"]

# Send message
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps({"orderId": "ORD-001", "amount": 1500}),
    MessageGroupId="orders",
)

# Receive + process + delete
resp = sqs.receive_message(QueueUrl=queue_url,
    MaxNumberOfMessages=10, WaitTimeSeconds=20)
for msg in resp.get("Messages", []):
    data = json.loads(msg["Body"])
    print("Processing:", data)
    sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=msg["ReceiptHandle"])

# SNS — create topic + publish
topic = sns.create_topic(Name="order-events")["TopicArn"]
sns.publish(TopicArn=topic,
    Message=json.dumps({"event": "ORDER_PLACED", "orderId": "ORD-001"}),
    Subject="New Order")

# Subscribe an SQS queue to SNS topic
sns.subscribe(TopicArn=topic, Protocol="sqs",
    Endpoint="arn:aws:sqs:ap-south-1:123:orders.fifo")`,
  },
  {
    id: 6, emoji: "💻", title: "EC2 — Virtual Machines",
    color: T.boto3,
    theory: [
      "EC2 (Elastic Compute Cloud) provides virtual servers. Choose OS, CPU, RAM, storage.",
      "AMI (Amazon Machine Image): the OS snapshot your instance boots from.",
      "Security Groups act as firewalls — control inbound and outbound traffic by port.",
      "Key pairs for SSH authentication. Use Systems Manager Session Manager for passwordless access.",
    ],
    notes: [
      "Always specify a VPC, subnet, and security group — don't rely on defaults in production.",
      "Use spot instances for batch jobs — up to 90% cheaper but can be interrupted.",
      "IAM instance profiles attach roles to EC2 — better than hardcoding credentials.",
      "User data: bootstrap script that runs on first boot (install packages, start services).",
    ],
    code: `import boto3

ec2 = boto3.client("ec2", region_name="ap-south-1")

# Launch instance
response = ec2.run_instances(
    ImageId="ami-0f58b397bc5c1f2e8",  # Amazon Linux 2023
    InstanceType="t3.micro",
    MinCount=1, MaxCount=1,
    KeyName="my-key-pair",
    SecurityGroupIds=["sg-0abc123"],
    SubnetId="subnet-0def456",
    IamInstanceProfile={"Name": "MyEC2Role"},
    UserData="""#!/bin/bash
yum update -y
pip3 install boto3 playwright
playwright install chromium
""",
    TagSpecifications=[{
        "ResourceType": "instance",
        "Tags": [{"Key": "Name", "Value": "playwright-runner"}]
    }],
)
instance_id = response["Instances"][0]["InstanceId"]

# Wait until running
waiter = ec2.get_waiter("instance_running")
waiter.wait(InstanceIds=[instance_id])

# Stop / Start / Terminate
ec2.stop_instances(InstanceIds=[instance_id])
ec2.start_instances(InstanceIds=[instance_id])
ec2.terminate_instances(InstanceIds=[instance_id])`,
  },
  {
    id: 7, emoji: "🔐", title: "IAM — Identity & Access",
    color: T.boto3,
    theory: [
      "IAM controls who (authentication) can do what (authorization) in your AWS account.",
      "Principle of least privilege: grant only permissions actually needed.",
      "Roles are assumed by services or users temporarily — no long-term credentials.",
      "Policies are JSON documents attached to users, groups, or roles.",
    ],
    notes: [
      "Use managed policies where possible — AWS maintains them.",
      "Never use root account for daily work. Create admin IAM users.",
      "MFA is mandatory for any account with console access.",
      "IAM Access Analyzer detects resources shared outside your account.",
    ],
    code: `import boto3, json

iam = boto3.client("iam")

# Create a role for Lambda
trust_policy = json.dumps({
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "lambda.amazonaws.com"},
        "Action": "sts:AssumeRole"
    }]
})
role = iam.create_role(
    RoleName="lambda-s3-reader",
    AssumeRolePolicyDocument=trust_policy,
    Description="Lambda role with S3 read access",
)

# Attach managed policy
iam.attach_role_policy(
    RoleName="lambda-s3-reader",
    PolicyArn="arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
)

# Create inline policy (more specific)
policy = json.dumps({
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": ["s3:GetObject"],
        "Resource": "arn:aws:s3:::my-bucket/*",
    }]
})
iam.put_role_policy(RoleName="lambda-s3-reader",
    PolicyName="S3ReadInline", PolicyDocument=policy)

# Simulate permissions
iam.simulate_principal_policy(
    PolicySourceArn="arn:aws:iam::123:role/lambda-s3-reader",
    ActionNames=["s3:GetObject"],
    ResourceArns=["arn:aws:s3:::my-bucket/file.txt"],
)`,
  },
  {
    id: 8, emoji: "📄", title: "Paginators & Waiters",
    color: T.boto3,
    theory: [
      "AWS APIs paginate large result sets — paginators handle this automatically.",
      "Without paginators you must manually track NextToken / NextMarker in a loop.",
      "Waiters poll an API until a resource reaches a desired state (running, deleted, available).",
      "Both paginators and waiters are service-specific — check the boto3 docs for what's available.",
    ],
    notes: [
      "paginator.paginate() returns an iterator of pages — loop over it.",
      "PaginationConfig: MaxItems and PageSize to control how much you fetch.",
      "waiter.wait() blocks until done. Add WaiterConfig={'Delay':5,'MaxAttempts':60}.",
      "Custom waiters can be created with botocore.waiter.WaiterModel for undocumented ones.",
    ],
    code: `import boto3

s3 = boto3.client("s3")
ec2 = boto3.client("ec2")

# Paginator — list ALL objects (handles >1000 automatically)
paginator = s3.get_paginator("list_objects_v2")
pages = paginator.paginate(
    Bucket="my-large-bucket",
    Prefix="logs/2024/",
    PaginationConfig={"MaxItems": 5000, "PageSize": 500},
)
all_keys = []
for page in pages:
    for obj in page.get("Contents", []):
        all_keys.append(obj["Key"])
print(f"Found {len(all_keys)} objects")

# EC2 paginator — describe all instances
ec2_paginator = ec2.get_paginator("describe_instances")
for page in ec2_paginator.paginate(Filters=[{"Name":"instance-state-name","Values":["running"]}]):
    for reservation in page["Reservations"]:
        for inst in reservation["Instances"]:
            print(inst["InstanceId"], inst["InstanceType"])

# Waiter — wait for instance to stop
waiter = ec2.get_waiter("instance_stopped")
waiter.wait(
    InstanceIds=["i-0abc123"],
    WaiterConfig={"Delay": 10, "MaxAttempts": 30}
)
print("Instance stopped!")`,
  },
  {
    id: 9, emoji: "🏆", title: "Best Practices & Error Handling",
    color: T.boto3,
    theory: [
      "Always handle ClientError — every boto3 call can raise it on AWS-side failures.",
      "Use error_code to handle specific failures: NoSuchBucket, AccessDenied, ThrottlingException.",
      "Implement exponential backoff for throttling — or rely on Config adaptive retry mode.",
      "Never log credentials. Use CloudTrail to audit all API calls.",
    ],
    notes: [
      "from botocore.exceptions import ClientError — always import this.",
      "error['Error']['Code'] gives the specific AWS error code string.",
      "Adaptive retry mode handles throttling automatically.",
      "Use Secrets Manager or SSM Parameter Store for all secrets — never env vars in prod.",
    ],
    code: `import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from botocore.config import Config

# Adaptive retries
config = Config(retries={"max_attempts": 10, "mode": "adaptive"})
s3 = boto3.client("s3", config=config)

def safe_get_object(bucket: str, key: str) -> bytes | None:
    try:
        resp = s3.get_object(Bucket=bucket, Key=key)
        return resp["Body"].read()
    except ClientError as e:
        code = e.response["Error"]["Code"]
        if code == "NoSuchKey":
            print(f"Object {key} not found")
        elif code == "AccessDenied":
            print("No permission to read this object")
        elif code == "NoSuchBucket":
            print(f"Bucket {bucket} does not exist")
        else:
            raise  # re-raise unexpected errors
    except NoCredentialsError:
        print("AWS credentials not configured")
    return None

# Context manager for temp files in S3
from contextlib import contextmanager
import tempfile, os

@contextmanager
def s3_temp_download(bucket, key):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".tmp") as f:
        s3.download_fileobj(bucket, key, f)
        tmp_path = f.name
    try:
        yield tmp_path
    finally:
        os.unlink(tmp_path)

with s3_temp_download("my-bucket", "data.csv") as path:
    import pandas as pd
    df = pd.read_csv(path)`,
  },
];

// ─── Python Topics ────────────────────────────────────────────────────────────
const pythonTopics = [
  {
    id: 1, emoji: "🐍", title: "Variables, Types & f-strings",
    color: T.python,
    theory: [
      "Python is dynamically typed — variables are just names pointing to objects.",
      "Core built-in types: int, float, str, bool, list, tuple, dict, set, None.",
      "f-strings (f'Hello {name}') are the fastest and most readable way to format strings.",
      "type() checks an object's type. isinstance() checks type hierarchy.",
    ],
    notes: [
      "Python uses duck typing — if it behaves like a duck, it's a duck.",
      "None is a singleton — use 'is None', not '== None'.",
      "Integers are arbitrary precision in Python — no overflow.",
      "Strings are immutable. Use list joins for heavy concatenation.",
    ],
    code: `# Variables — dynamically typed
name = "Devendra"
age = 25
height = 5.9
is_active = True
skills = ["Python", "AWS", "Playwright"]
info = {"city": "Bhopal", "country": "India"}
coords = (23.25, 77.40)   # tuple — immutable
unique_tags = {"python", "automation", "cloud"}

# Type checks
print(type(name))           # <class 'str'>
print(isinstance(age, int)) # True

# f-strings (Python 3.6+)
msg = f"Name: {name}, Age: {age}, In 5 years: {age + 5}"
print(msg)  # Name: Devendra, Age: 25, In 5 years: 30

# Multi-line f-string
profile = (
    f"{'='*30}\\n"
    f"  Name:   {name}\\n"
    f"  Age:    {age}\\n"
    f"  Skills: {', '.join(skills)}\\n"
    f"{'='*30}"
)

# Type conversion
num_str = "42"
num = int(num_str)
pi_str = str(3.14159)
flag = bool(0)  # False — 0, "", [], {}, None are all falsy`,
  },
  {
    id: 2, emoji: "🔁", title: "Control Flow & Comprehensions",
    color: T.python,
    theory: [
      "Python uses indentation (4 spaces) to define code blocks — no braces.",
      "for loops iterate over any iterable (list, dict, range, generator, file...).",
      "Comprehensions create new lists/dicts/sets in one line — faster than equivalent loops.",
      "Generator expressions are lazy comprehensions — they produce values on demand.",
    ],
    notes: [
      "range(start, stop, step) — stop is exclusive.",
      "enumerate(iterable) gives (index, value) pairs.",
      "zip(a, b) combines two iterables into pairs.",
      "Walrus operator := assigns and uses a value in one expression (Python 3.8+).",
    ],
    code: `# if / elif / else
score = 87
if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"

# for loop with enumerate
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# while with break/continue
n = 0
while True:
    n += 1
    if n % 2 == 0:
        continue  # skip even
    if n > 9:
        break     # stop at 10
    print(n)      # 1, 3, 5, 7, 9

# List comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# Dict comprehension
word_lengths = {word: len(word) for word in ["python", "playwright", "boto3"]}

# Generator expression (lazy — no list in memory)
total = sum(x**2 for x in range(1_000_000))  # memory efficient

# Walrus operator
import re
data = "Error code: 404 on /api/users"
if m := re.search(r"\\d+", data):
    print(f"Found number: {m.group()}")  # 404`,
  },
  {
    id: 3, emoji: "🧩", title: "Functions & Decorators",
    color: T.python,
    theory: [
      "Functions are first-class objects in Python — they can be passed, returned, stored.",
      "*args collects extra positional arguments into a tuple. **kwargs collects keyword args into a dict.",
      "Closures capture variables from the enclosing scope.",
      "Decorators are functions that wrap other functions — used for logging, caching, auth.",
    ],
    notes: [
      "Mutable default arguments are a common trap: use None and set inside the function.",
      "@functools.wraps(func) preserves the wrapped function's metadata.",
      "@functools.lru_cache() memoizes function results automatically.",
      "functools.partial() creates partially applied functions.",
    ],
    code: `from functools import wraps, lru_cache
import time

# *args, **kwargs
def log(*args, level="INFO", **kwargs):
    print(f"[{level}]", *args, kwargs or "")

log("Server started", port=8080)  # [INFO] Server started {'port': 8080}

# Closure
def make_multiplier(factor):
    def multiply(n):          # captures 'factor'
        return n * factor
    return multiply

triple = make_multiplier(3)
print(triple(7))  # 21

# Decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def heavy_task(n):
    return sum(range(n))

heavy_task(1_000_000)

# Memoization with lru_cache
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # instant — cached`,
  },
  {
    id: 4, emoji: "🏛️", title: "OOP — Classes & Inheritance",
    color: T.python,
    theory: [
      "Python supports full OOP: classes, inheritance, encapsulation, polymorphism.",
      "__init__ is the constructor. self refers to the instance (like 'this' in other languages).",
      "Dunder (double underscore) methods customize how objects behave with operators and builtins.",
      "@dataclass decorator auto-generates __init__, __repr__, __eq__ from class annotations.",
    ],
    notes: [
      "@classmethod receives the class as first arg. @staticmethod receives nothing extra.",
      "Private convention: _single_underscore (internal use), __double (name mangled).",
      "super().__init__() calls parent constructor — always call in child __init__.",
      "@property turns a method into a readable attribute — add @x.setter for write access.",
    ],
    code: `from dataclasses import dataclass, field
from typing import Optional

@dataclass
class AWSResource:
    name: str
    region: str
    tags: dict = field(default_factory=dict)
    _arn: Optional[str] = field(default=None, repr=False)

    @property
    def arn(self) -> str:
        return self._arn or f"arn:aws::{self.region}::{self.name}"

    @arn.setter
    def arn(self, value: str):
        self._arn = value

    def __str__(self) -> str:
        return f"<{self.__class__.__name__} {self.name} @ {self.region}>"

class S3Bucket(AWSResource):
    def __init__(self, name: str, region: str, versioning: bool = False):
        super().__init__(name=name, region=region)
        self.versioning = versioning

    @classmethod
    def from_arn(cls, arn: str):
        parts = arn.split(":")
        return cls(name=parts[-1], region=parts[3])

    def enable_versioning(self):
        self.versioning = True
        return self  # fluent interface

bucket = S3Bucket("my-data", "ap-south-1")
bucket.enable_versioning()
print(bucket)           # <S3Bucket my-data @ ap-south-1>
print(bucket.arn)       # arn:aws:::ap-south-1::my-data`,
  },
  {
    id: 5, emoji: "⚡", title: "Async/Await & asyncio",
    color: T.python,
    theory: [
      "asyncio is Python's single-threaded concurrency model using an event loop.",
      "async def defines a coroutine. await pauses it until the awaited task is done.",
      "asyncio.gather() runs multiple coroutines concurrently — like Promise.all().",
      "Use async for I/O-bound tasks (HTTP, DB, file). Use threading/multiprocessing for CPU-bound.",
    ],
    notes: [
      "asyncio.run(main()) is the entry point — call once at the top level.",
      "asyncio.create_task() schedules a coroutine without awaiting immediately.",
      "asyncio.sleep(0) yields control to the event loop without actual delay.",
      "aiohttp, httpx for async HTTP. aiofiles for async file I/O. aioboto3 for async AWS.",
    ],
    code: `import asyncio
import httpx  # pip install httpx

async def fetch(client: httpx.AsyncClient, url: str) -> dict:
    resp = await client.get(url)
    return {"url": url, "status": resp.status_code}

async def scrape_all(urls: list[str]) -> list[dict]:
    async with httpx.AsyncClient(timeout=10) as client:
        # gather — run all concurrently (not sequentially!)
        tasks = [fetch(client, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    return results

async def main():
    urls = [
        "https://httpbin.org/get",
        "https://httpbin.org/status/200",
        "https://httpbin.org/json",
    ]
    results = await scrape_all(urls)
    for r in results:
        if isinstance(r, Exception):
            print(f"Failed: {r}")
        else:
            print(f"{r['url']} → {r['status']}")

    # Task with timeout
    try:
        async with asyncio.timeout(5):
            await asyncio.sleep(3)
            print("Completed in time")
    except asyncio.TimeoutError:
        print("Timed out!")

asyncio.run(main())`,
  },
];

// ─── Interview Definitions ────────────────────────────────────────────────────
const interviewCategories = [
  {
    label: "Playwright", emoji: "🎭", color: T.playwright,
    terms: [
      { term: "Locator", simple: "A smart pointer to one or more elements on the page.", technical: "Locators are lazy, auto-retrying element references. Unlike ElementHandles, they re-query the DOM on every action, making them resilient to re-renders.", tip: "Always prefer semantic locators (role, label, text) over CSS/XPath for maintainability." },
      { term: "Auto-wait", simple: "Playwright waits for elements automatically before acting.", technical: "Actions wait for: element to be attached, visible, stable (no CSS transition), enabled, and editable. Assertions use polling with configurable timeout.", tip: "Mention this when asked about flaky tests — Playwright's auto-wait eliminates most timing issues." },
      { term: "Network Interception", simple: "Intercept and mock HTTP requests from the browser.", technical: "page.route() registers handlers that can fulfill, abort, or modify requests matching URL patterns. Enables testing without a real backend.", tip: "Great for testing error scenarios: simulate 500 errors without breaking your actual API." },
      { term: "Page Object Model", simple: "Represent each page as a class with methods for actions.", technical: "POM encapsulates locators and interactions inside classes. Tests call high-level methods like login() instead of raw locator operations, reducing duplication.", tip: "Emphasize maintainability — when UI changes, update one class, not all tests." },
      { term: "Trace Viewer", simple: "A recording of every step in a test that you can replay.", technical: "Traces contain screenshots, DOM snapshots, network requests, and console logs per action. View at trace.playwright.dev or via playwright show-trace.", tip: "Mention this when discussing CI debugging — Playwright traces are invaluable for failures you can't reproduce locally." },
      { term: "expect() assertion", simple: "Web-first assertions that auto-retry until they pass.", technical: "expect() uses polling to check conditions until they become true or timeout. Unlike synchronous assert, it tolerates asynchronous state changes in the UI.", tip: "Contrast with Selenium's explicit waits — in Playwright, assertions handle timing themselves." },
    ],
  },
  {
    label: "Boto3 / AWS", emoji: "☁️", color: T.boto3,
    terms: [
      { term: "IAM Role", simple: "A set of permissions that AWS services can temporarily assume.", technical: "Roles are IAM identities with policies. Unlike users, they have no long-term credentials — they issue temporary security tokens via STS AssumeRole. Used for EC2 instance profiles, Lambda execution, and cross-account access.", tip: "Always prefer roles over access keys. Roles = no credential rotation, no secret storage." },
      { term: "S3 Presigned URL", simple: "A temporary URL granting access to a private S3 object.", technical: "Presigned URLs embed credentials and expiry in the URL signature (SigV4). Allows unauthenticated clients to upload/download specific objects without exposing AWS credentials.", tip: "Use case: browser direct uploads to S3, bypassing your server for large files." },
      { term: "DynamoDB GSI", simple: "An index that lets you query DynamoDB on non-primary-key attributes.", technical: "Global Secondary Index maintains a copy of selected attributes with a different partition/sort key. Queries on GSI are eventually consistent by default. Each GSI has its own read/write capacity.", tip: "Common interview question: explain Query vs Scan, and when to use a GSI." },
      { term: "Lambda Cold Start", simple: "The delay when Lambda initializes a new execution environment.", technical: "On first invocation or after idle period, Lambda provisions an execution environment: downloads code, initializes runtime, runs init code outside the handler. Subsequent invocations reuse the warm environment.", tip: "Mitigation: provisioned concurrency, smaller packages, keep-warm pings, or Graviton runtimes." },
      { term: "SQS Visibility Timeout", simple: "The time a message is hidden from other consumers while being processed.", technical: "When a consumer receives a message, it becomes invisible for the visibility timeout duration. If not deleted in time, it reappears — allowing other consumers to process it. Prevents duplicate processing when a consumer crashes.", tip: "Set visibility timeout > your max processing time. Use ChangeMessageVisibility to extend if needed." },
      { term: "Boto3 Paginator", simple: "Automatically handles multi-page AWS API responses.", technical: "AWS APIs return a maximum number of results per call with a NextToken. Paginators abstract this into an iterator of pages, automatically requesting subsequent pages.", tip: "Always use paginators for list operations in production — hardcoding a single API call breaks on large datasets." },
    ],
  },
  {
    label: "Python", emoji: "🐍", color: T.python,
    terms: [
      { term: "GIL", simple: "A lock that allows only one Python thread to execute bytecode at a time.", technical: "The Global Interpreter Lock (CPython) prevents true parallel thread execution for CPU-bound code. I/O-bound threads release the GIL while waiting. Bypass with multiprocessing, Cython, or asyncio.", tip: "Interviewers love this. Conclude with: 'For CPU-bound work I'd use multiprocessing or concurrent.futures.ProcessPoolExecutor.'" },
      { term: "Generator", simple: "A function that yields values one at a time instead of building a list.", technical: "Generators are iterators created with yield. They suspend execution at each yield, resuming when next() is called. Use a generator expression (x for x in ...) for single-use sequences.", tip: "Key selling point: memory efficiency. Processing a 10GB log file line by line vs loading it all." },
      { term: "Context Manager", simple: "Ensures setup and teardown always happen around a block of code.", technical: "Context managers implement __enter__ and __exit__. @contextmanager from contextlib lets you write them as generators with a single yield. Used for file handles, DB connections, locks, timers.", tip: "with open() is the classic example. Write your own for boto3 temp file downloads." },
      { term: "Decorator", simple: "A function that wraps another function to add behavior.", technical: "Decorators are higher-order functions: they take a function, return a new function. @wraps preserves the wrapped function's __name__ and __doc__. Used in frameworks for routing, auth, caching.", tip: "Common use case: @retry decorator that automatically retries failed AWS API calls." },
      { term: "asyncio Event Loop", simple: "A loop that runs async tasks cooperatively on one thread.", technical: "The event loop schedules coroutines, handles I/O events, and resumes suspended coroutines when their awaited result is ready. asyncio.run() creates, runs, and closes the loop.", tip: "Contrast with threading: asyncio has lower overhead and no race conditions, but requires async-compatible libraries." },
      { term: "Type Hints", simple: "Annotations that describe the expected types of variables and functions.", technical: "Type hints (PEP 484) are not enforced at runtime — they're metadata for type checkers (mypy, Pyright) and IDEs. Use typing module for complex types: Optional, Union, List, Dict, Callable.", tip: "Mention that boto3-stubs provides type stubs for all AWS clients — better autocomplete and error detection." },
    ],
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  app: { minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: "16px" },
  nav: { background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "0 24px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 100 },
  navLink: (active) => ({
    padding: "16px 14px", background: "none", border: "none", cursor: "pointer",
    color: active ? "#fff" : T.muted, fontFamily: "inherit", fontSize: "15px", fontWeight: active ? 700 : 400,
    borderBottom: `3px solid ${active ? T.playwright : "transparent"}`,
    transition: "all 0.2s",
  }),
  page: { padding: "40px 32px", maxWidth: 1100, margin: "0 auto" },
  h1: { fontSize: "42px", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-1px" },
  h2: { fontSize: "28px", fontWeight: 700, margin: "0 0 8px" },
  badge: (color) => ({
    display: "inline-block", padding: "4px 12px", borderRadius: 20,
    background: color + "22", color, fontSize: "13px", fontWeight: 600, border: `1px solid ${color}44`,
  }),
  card: {
    background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
    padding: "24px 28px", marginBottom: 20,
  },
  code: {
    background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 10,
    padding: "20px 22px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: "14px", lineHeight: 1.7, color: "#a5f3fc", overflowX: "auto",
    whiteSpace: "pre", display: "block",
  },
  btn: (active, color) => ({
    padding: "9px 18px", borderRadius: 8, border: `1px solid ${active ? color : T.border}`,
    background: active ? color + "22" : "transparent", color: active ? color : T.muted,
    cursor: "pointer", fontSize: "14px", fontFamily: "inherit", fontWeight: active ? 600 : 400,
    transition: "all 0.15s",
  }),
  progress: (w, color) => ({
    height: 5, borderRadius: 3, background: color, width: `${w}%`, transition: "width 0.4s",
  }),
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page: pg, setPage }) {
  const links = [
    { id: "home", label: "🏠 Home" },
    { id: "review", label: "📋 Quick Review" },
    { id: "python", label: "🐍 Python" },
    { id: "playwright", label: "🎭 Playwright" },
    { id: "boto3", label: "☁️ Boto3" },
    { id: "interview", label: "💼 Interview" },
  ];
  return (
    <nav style={s.nav}>
      <span style={{ fontSize: "20px", fontWeight: 800, color: T.playwright, marginRight: 12 }}>PyCloud</span>
      {links.map(l => (
        <button key={l.id} onClick={() => setPage(l.id)} style={s.navLink(pg === l.id)}>{l.label}</button>
      ))}
    </nav>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home({ setPage }) {
  const cards = [
    { id: "python", icon: "🐍", title: "Python", subtitle: "Variables → OOP → Async", color: T.python, topics: pythonTopics.length },
    { id: "playwright", icon: "🎭", title: "Playwright", subtitle: "Selectors → POM → CDP", color: T.playwright, topics: playwrightTopics.length },
    { id: "boto3", icon: "☁️", title: "AWS Boto3", subtitle: "S3 → Lambda → Best Practices", color: T.boto3, topics: boto3Topics.length },
    { id: "interview", icon: "💼", title: "Interview Prep", subtitle: "Definitions & Answers", color: T.purple, topics: interviewCategories.reduce((a, c) => a + c.terms.length, 0) },
  ];
  return (
    <div style={s.page}>
      <div style={{ textAlign: "center", padding: "40px 0 60px" }}>
        <div style={{ fontSize: "64px", marginBottom: 16 }}>🐍☁️🎭</div>
        <h1 style={{ ...s.h1, fontSize: "52px", background: `linear-gradient(135deg, ${T.python}, ${T.playwright}, ${T.boto3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Python · Playwright · Boto3
        </h1>
        <p style={{ fontSize: "20px", color: T.muted, maxWidth: 520, margin: "0 auto 32px" }}>
          From basics to production. Master browser automation and AWS with Python.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("review")} style={{ padding: "14px 28px", borderRadius: 10, background: T.playwright, color: "#000", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}>
            📋 Quick Review
          </button>
          <button onClick={() => setPage("playwright")} style={{ padding: "14px 28px", borderRadius: 10, background: "transparent", color: T.playwright, border: `2px solid ${T.playwright}`, cursor: "pointer", fontSize: "16px", fontWeight: 700 }}>
            Start Learning →
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {cards.map(c => (
          <div key={c.id} onClick={() => setPage(c.id)} style={{
            ...s.card, cursor: "pointer", borderTop: `4px solid ${c.color}`,
            transition: "transform 0.15s, border-color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "36px", marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
            <div style={{ color: T.muted, fontSize: "15px", marginBottom: 14 }}>{c.subtitle}</div>
            <span style={s.badge(c.color)}>{c.topics} topics</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {[
          ["⚡", "Zero Config", "Just open and study"],
          ["🎯", "Code Examples", "Real, runnable snippets"],
          ["💼", "Interview Ready", "Definitions + tips"],
          ["📱", "Responsive", "Works on any screen"],
        ].map(([icon, title, sub]) => (
          <div key={title} style={{ padding: "20px", background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: "28px", marginBottom: 8 }}>{icon}</div>
            <div style={{ fontWeight: 700, fontSize: "17px", marginBottom: 4 }}>{title}</div>
            <div style={{ color: T.muted, fontSize: "14px" }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick Review ─────────────────────────────────────────────────────────────
function QuickReview() {
  const lines = quickReviewMD.split("\n");
  return (
    <div style={{ ...s.page, maxWidth: 860 }}>
      <h1 style={{ ...s.h1, color: T.playwright }}>📋 Quick Review</h1>
      <p style={{ color: T.muted, fontSize: "17px", marginBottom: 32 }}>Python · Playwright · Boto3 — all key concepts at a glance.</p>
      <div style={{ ...s.card, lineHeight: 1.9 }}>
        {lines.map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: "26px", fontWeight: 800, color: T.playwright, margin: "0 0 16px" }}>{line.slice(2)}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "20px", fontWeight: 700, color: T.boto3, margin: "28px 0 8px", paddingTop: 12, borderTop: `1px solid ${T.border}` }}>{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: "17px", fontWeight: 700, color: T.python, margin: "20px 0 6px" }}>{line.slice(4)}</h3>;
          if (line.startsWith("- ")) return <div key={i} style={{ paddingLeft: 20, color: T.text, fontSize: "15px", marginBottom: 4, position: "relative" }}><span style={{ position: "absolute", left: 6, color: T.playwright }}>•</span>{line.slice(2)}</div>;
          if (line.startsWith("> ")) return <div key={i} style={{ borderLeft: `3px solid ${T.playwright}`, paddingLeft: 16, color: T.muted, fontStyle: "italic", margin: "8px 0", fontSize: "15px" }}>{line.slice(2)}</div>;
          if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: `1px solid ${T.border}`, margin: "20px 0" }} />;
          if (line === "") return <div key={i} style={{ height: 6 }} />;
          return <p key={i} style={{ margin: "4px 0", color: T.text, fontSize: "15px" }}>{line}</p>;
        })}
      </div>
    </div>
  );
}

// ─── Topic Notes (generic for Python / Playwright / Boto3) ───────────────────
function TopicNotes({ topics, accentColor, title, icon }) {
  const [active, setActive] = useState(0);
  const [showCode, setShowCode] = useState(true);
  const topic = topics[active];

  return (
    <div style={{ display: "flex", height: "calc(100vh - 53px)", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 240, minWidth: 240, background: T.surface, borderRight: `1px solid ${T.border}`, overflowY: "auto", padding: "16px 0" }}>
        <div style={{ padding: "0 16px 12px", fontSize: "13px", fontWeight: 700, color: T.muted, letterSpacing: "1.5px", textTransform: "uppercase" }}>{icon} {title}</div>
        {topics.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px",
            background: active === i ? T.card : "transparent", border: "none",
            borderLeft: `4px solid ${active === i ? accentColor : "transparent"}`,
            color: active === i ? T.text : T.muted, cursor: "pointer", textAlign: "left", fontSize: "14px",
            fontFamily: "inherit", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "18px" }}>{t.emoji}</span>
            <span>{t.title}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 40px" }}>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 5, background: T.border, borderRadius: 3 }}>
            <div style={s.progress(((active + 1) / topics.length) * 100, accentColor)} />
          </div>
          <span style={{ color: T.muted, fontSize: "14px" }}>{active + 1} / {topics.length}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <span style={{ fontSize: "44px" }}>{topic.emoji}</span>
          <h1 style={{ ...s.h1, color: accentColor, marginTop: 8 }}>{topic.title}</h1>
          <span style={s.badge(accentColor)}>{title}</span>
        </div>

        {/* Theory */}
        <div style={{ ...s.card, borderTop: `4px solid ${accentColor}`, marginBottom: 20 }}>
          <div style={{ fontSize: "12px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: 14 }}>📖 Core Concepts</div>
          {topic.theory.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <span style={{ color: accentColor, fontWeight: 700, fontSize: "16px", minWidth: 20 }}>{i + 1}.</span>
              <p style={{ margin: 0, color: T.text, lineHeight: 1.8, fontSize: "16px" }}>{t}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ ...s.card, marginBottom: 20 }}>
          <div style={{ fontSize: "12px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: 14 }}>📌 Key Notes</div>
          {topic.notes.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingLeft: 4 }}>
              <span style={{ color: accentColor, fontSize: "18px" }}>›</span>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.75, fontSize: "15px" }}>{n}</p>
            </div>
          ))}
        </div>

        {/* Code */}
        <div style={s.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: "12px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase" }}>💻 Code Example</div>
            <button onClick={() => setShowCode(!showCode)} style={s.btn(showCode, accentColor)}>
              {showCode ? "Hide" : "Show"} Code
            </button>
          </div>
          {showCode && <code style={s.code}>{topic.code}</code>}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
            style={{ ...s.btn(false, accentColor), opacity: active === 0 ? 0.3 : 1, padding: "12px 24px", fontSize: "15px" }}>
            ← Previous
          </button>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {topics.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                width: active === i ? 20 : 8, height: 8, borderRadius: 4,
                background: active === i ? accentColor : T.border,
                cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>
          <button onClick={() => setActive(Math.min(topics.length - 1, active + 1))} disabled={active === topics.length - 1}
            style={{ ...s.btn(false, accentColor), opacity: active === topics.length - 1 ? 0.3 : 1, padding: "12px 24px", fontSize: "15px" }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Interview Defs ───────────────────────────────────────────────────────────
function InterviewDefs() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTerm, setActiveTerm] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const cat = interviewCategories[activeCat];
  const item = cat.terms[activeTerm];
  const totalTerms = interviewCategories.reduce((a, c) => a + c.terms.length, 0);
  const globalIndex = interviewCategories.slice(0, activeCat).reduce((a, c) => a + c.terms.length, 0) + activeTerm + 1;

  const next = () => {
    if (activeTerm < cat.terms.length - 1) { setActiveTerm(activeTerm + 1); }
    else if (activeCat < interviewCategories.length - 1) { setActiveCat(activeCat + 1); setActiveTerm(0); }
    setShowTip(false);
  };
  const prev = () => {
    if (activeTerm > 0) { setActiveTerm(activeTerm - 1); }
    else if (activeCat > 0) { const nc = activeCat - 1; setActiveCat(nc); setActiveTerm(interviewCategories[nc].terms.length - 1); }
    setShowTip(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 53px)", overflow: "hidden" }}>
      {/* Category tabs */}
      <div style={{ padding: "14px 24px", background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: T.muted, marginRight: 8 }}>💼 Interview Prep</span>
        {interviewCategories.map((c, i) => (
          <button key={i} onClick={() => { setActiveCat(i); setActiveTerm(0); setShowTip(false); }} style={s.btn(activeCat === i, c.color)}>
            {c.emoji} {c.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: T.muted, fontSize: "14px" }}>{globalIndex} / {totalTerms}</span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: T.surface, borderRight: `1px solid ${T.border}`, overflowY: "auto", padding: "8px 0" }}>
          {cat.terms.map((t, i) => (
            <button key={i} onClick={() => { setActiveTerm(i); setShowTip(false); }} style={{
              display: "block", width: "100%", padding: "12px 16px",
              background: activeTerm === i ? T.card : "transparent", border: "none",
              borderLeft: `4px solid ${activeTerm === i ? cat.color : "transparent"}`,
              color: activeTerm === i ? T.text : T.muted, cursor: "pointer", textAlign: "left",
              fontSize: "14px", fontFamily: "inherit",
            }}>
              {t.term}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 40px" }}>
          <div style={{ height: 5, background: T.border, borderRadius: 3, marginBottom: 28 }}>
            <div style={s.progress((globalIndex / totalTerms) * 100, cat.color)} />
          </div>

          <div style={{ ...s.card, borderTop: `4px solid ${cat.color}` }}>
            <h2 style={{ ...s.h2, color: cat.color, fontSize: "32px", marginBottom: 24 }}>{item.term}</h2>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: 10 }}>🗣️ Simple Answer</div>
              <p style={{ margin: 0, color: T.text, lineHeight: 1.85, fontSize: "17px", padding: "14px 18px", background: "#0d1117", borderRadius: 10, borderLeft: `4px solid ${cat.color}` }}>
                {item.simple}
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: 10 }}>💻 Technical Answer</div>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.85, fontSize: "16px", padding: "14px 18px", background: "#0d1117", borderRadius: 10, borderLeft: `4px solid ${T.border}` }}>
                {item.technical}
              </p>
            </div>

            <button onClick={() => setShowTip(!showTip)} style={s.btn(showTip, "#f59e0b")}>
              {showTip ? "Hide" : "Show"} Interview Tip 💡
            </button>

            {showTip && (
              <div style={{ marginTop: 14, padding: "14px 18px", background: "#f59e0b11", border: `1px solid #f59e0b44`, borderRadius: 10, color: "#fbbf24", fontSize: "15px", lineHeight: 1.8 }}>
                💡 {item.tip}
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button onClick={prev} disabled={activeCat === 0 && activeTerm === 0}
              style={{ ...s.btn(false, cat.color), padding: "12px 24px", fontSize: "15px", opacity: activeCat === 0 && activeTerm === 0 ? 0.3 : 1 }}>
              ← Previous
            </button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {cat.terms.map((_, i) => (
                <div key={i} onClick={() => { setActiveTerm(i); setShowTip(false); }} style={{
                  width: activeTerm === i ? 20 : 8, height: 8, borderRadius: 4,
                  background: activeTerm === i ? cat.color : T.border,
                  cursor: "pointer", transition: "all 0.2s",
                }} />
              ))}
            </div>
            <button onClick={next} disabled={activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1}
              style={{ ...s.btn(false, cat.color), padding: "12px 24px", fontSize: "15px", opacity: activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1 ? 0.3 : 1 }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const render = () => {
    switch (page) {
      case "home": return <Home setPage={setPage} />;
      case "review": return <div style={s.page}><QuickReview /></div>;
      case "python": return <TopicNotes topics={pythonTopics} accentColor={T.python} title="Python" icon="🐍" />;
      case "playwright": return <TopicNotes topics={playwrightTopics} accentColor={T.playwright} title="Playwright" icon="🎭" />;
      case "boto3": return <TopicNotes topics={boto3Topics} accentColor={T.boto3} title="AWS Boto3" icon="☁️" />;
      case "interview": return <InterviewDefs />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div style={s.app}>
      <Navbar page={page} setPage={setPage} />
      {render()}
    </div>
  );
}
