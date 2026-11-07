CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);


INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- BrightFuture Builders (ID 1)
(
    1,
    'Community Road Improvement',
    'Repair and improve roads in the local community.',
    'Central District',
    '2026-11-15'
),
(
    1,
    'School Building Renovation',
    'Renovate classrooms and improve school facilities.',
    'Community Primary School',
    '2026-11-20'
),
(
    1,
    'Community Water Project',
    'Install clean water facilities for local residents.',
    'North District',
    '2026-11-25'
),
(
    1,
    'Public Park Construction',
    'Build a recreational park for families and children.',
    'Green Valley',
    '2026-12-01'
),
(
    1,
    'Community Bridge Repair',
    'Repair a damaged pedestrian bridge.',
    'East District',
    '2026-12-05'
),

-- GreenHarvest Growers (ID 2)
(
    2,
    'Urban Community Garden',
    'Create a vegetable garden for neighborhood residents.',
    'Central Neighborhood',
    '2026-11-16'
),
(
    2,
    'Tree Planting Campaign',
    'Plant trees to promote environmental sustainability.',
    'Green Valley',
    '2026-11-21'
),
(
    2,
    'Urban Farming Workshop',
    'Teach residents sustainable urban farming techniques.',
    'Community Center',
    '2026-11-26'
),
(
    2,
    'School Vegetable Garden',
    'Establish a vegetable garden at a local school.',
    'Primary School',
    '2026-12-02'
),
(
    2,
    'Food Sustainability Campaign',
    'Educate families about sustainable food production.',
    'West District',
    '2026-12-06'
),

-- UnityServe Volunteers (ID 3)
(
    3,
    'Community Cleanup Day',
    'Organize volunteers to clean public spaces.',
    'Central District',
    '2026-11-17'
),
(
    3,
    'Orphanage Support Project',
    'Provide assistance and supplies to local orphanages.',
    'Community Orphanage',
    '2026-11-22'
),
(
    3,
    'Elderly Care Assistance',
    'Organize volunteers to support elderly residents.',
    'North District',
    '2026-11-27'
),
(
    3,
    'Community Food Distribution',
    'Distribute food supplies to vulnerable families.',
    'West District',
    '2026-12-03'
),
(
    3,
    'Youth Volunteer Program',
    'Encourage young people to participate in community service.',
    'Community Center',
    '2026-12-07'
);

-- Create the category table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create the junction table
CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);

-- Insert service project categories
INSERT INTO category (category_name)
VALUES
    ('Infrastructure'),
    ('Education'),
    ('Environment'),
    ('Community Development'),
    ('Health and Social Support'),
    ('Food Security');

-- Associate projects with categories

INSERT INTO service_project_category (project_id, category_id)
SELECT p.project_id, c.category_id
FROM service_project p
CROSS JOIN category c
WHERE
    (p.title = 'Community Road Improvement' AND c.category_name = 'Infrastructure')
    OR (p.title = 'School Building Renovation' AND c.category_name = 'Education')
    OR (p.title = 'Community Water Project' AND c.category_name = 'Infrastructure')
    OR (p.title = 'Public Park Construction' AND c.category_name = 'Environment')
    OR (p.title = 'Community Bridge Repair' AND c.category_name = 'Infrastructure')
    OR (p.title = 'Urban Community Garden' AND c.category_name = 'Environment')
    OR (p.title = 'Tree Planting Campaign' AND c.category_name = 'Environment')
    OR (p.title = 'Urban Farming Workshop' AND c.category_name = 'Education')
    OR (p.title = 'School Vegetable Garden' AND c.category_name = 'Education')
    OR (p.title = 'Food Sustainability Campaign' AND c.category_name = 'Food Security')
    OR (p.title = 'Community Cleanup Day' AND c.category_name = 'Environment')
    OR (p.title = 'Orphanage Support Project' AND c.category_name = 'Health and Social Support')
    OR (p.title = 'Elderly Care Assistance' AND c.category_name = 'Health and Social Support')
    OR (p.title = 'Community Food Distribution' AND c.category_name = 'Food Security')
    OR (p.title = 'Youth Volunteer Program' AND c.category_name = 'Community Development');
        OR (p.title = 'Youth Volunteer Program' AND c.category_name = 'Community Development')
ON CONFLICT (project_id, category_id) DO NOTHING;

