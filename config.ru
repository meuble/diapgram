require 'rubygems'
require 'vendor/sinatra/lib/sinatra.rb'

log = File.new("log/sinatra.log", "a+")
STDOUT.reopen(log)
STDERR.reopen(log)

require 'application.rb'
run Sinatra::Application
