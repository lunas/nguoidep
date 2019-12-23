
if Rails.env.development?
  AdminUser.create!(
    email: 'admin@example.com',
    password: 'password',
    password_confirmation: 'password'
  )

  [
    {title: 'Dec 2019 Covers', date: Date.new(2019, 12, 1)},
    {title: 'Dec 2019 Issues', date: Date.new(2019, 12, 1)},
    {title: 'Nov 2019 Covers', date: Date.new(2019, 11, 1)},
    {title: 'Nov 2019 Issues', date: Date.new(2019, 11, 1)},
    {title: 'Oct 2019 Covers', date: Date.new(2019, 10, 1)},
    {title: 'Oct 2019 Covers', date: Date.new(2019, 10, 1)},
  ].each do |issue|
    Issue.create!(
      title: issue[:title],
      date: issue[:date],
      created_at: issue[:date],
      updated_at: issue[:date],
    )
  end
end
